import io
import logging
import math
import time
import sys

from django.db import models

from django.core.exceptions import ValidationError

logger = logging.getLogger('custom')


class ChunkableFieldFile(models.fields.files.FieldFile):
    # in bytes, azure actual limit is 4Mb, we do 3 to be safe
    AZURE_CHUNK_SIZE_LIMIT = 3 * 1024 * 1024

    def __str__(self):
        return str(self.name)

    def save(self, name, content, save=True):

        if self.instance.pk == None or (self.instance.pk != None and self.instance.bytes != None):

            # File update, bytes get updated just after the file has finished it upload
            # so, if it is not null and we are saving that is an update
            if self.instance.pk != None and self.instance.bytes != None:
                self.instance.bytes = None  # reset the size in the instance
                name = str(self.instance.file)
            else:
                name = self.field.generate_filename(self.instance, name)

            self.name = self.storage.save(
                name, content, max_length=self.field.max_length)
            setattr(self.instance, self.field.name, self.name)
            self._committed = True
        else:
            if hasattr(self.instance, 'current_chunk') and hasattr(self.instance, 'total_chunks'):
                if self.instance.current_chunk != None and self.instance.total_chunks != None:
                    if self.instance.current_chunk > self.instance.total_chunks:
                        raise ValidationError(
                            "Your current_chunk attribute cannot be bigger than your total_chunks attribute")

                    # Update media, check chunks
                    if hasattr(self.instance, 'get_dirty_fields'):
                        oldValues = self.instance.get_dirty_fields()
                        self.name = str(
                            self.instance.get_dirty_fields()['file'])

                        if self.instance.current_chunk != oldValues['current_chunk']+1:
                            raise ValidationError('You sent chunk number ' + str(self.instance.current_chunk) + ", however we were expecting chunk number " + str(
                                oldValues['current_chunk']+1) + ", please sent the chunks in a linear order")

                        self.storage.append(self.name, content)
                        self._committed = True
                    else:
                        raise ValidationError(
                            'Your model has to extend DirtyFieldsMixin in order to use the chunks functionality, please fix your model')
                else:
                    raise ValidationError(
                        'Your model has to have the attributes <current_chunk> and <total_chunks>')

        # Save the object because it has changed, unless save is False
        if save:
            self.instance.save()

    def openChunk(self, startByte=None, endByte=None, progress_callback=None):
        self.file = self.storage.open(
            self.name, startByte=startByte, endByte=endByte, progress_callback=progress_callback)
        return self

    def openAsGenerator(self, progress_callback=None):
        startByte = 0
        endByte = ChunkableFieldFile.AZURE_CHUNK_SIZE_LIMIT
        chunks = math.ceil(
            self.size / ChunkableFieldFile.AZURE_CHUNK_SIZE_LIMIT)

        for i in range(0, chunks):
            if endByte > self.size:
                # not sure why but DO NOT REMOVE THE -1, this is why it is working
                endByte = self.size - 1

            try:
                yield self.openChunk(startByte=startByte, endByte=endByte, progress_callback=progress_callback).read()
                startByte = endByte + 1  # also, do not remove this +1, it only works with it
                endByte += ChunkableFieldFile.AZURE_CHUNK_SIZE_LIMIT
            except:
                logger.error(sys.exc_info()[0])
                raise

    def getUrlWithSas(self, ip=None, nameToGive=None):
        return self.storage.urlWithSasAuth(self.name, ip, nameToGive)

    def openAsStream(self, mode='rb'):
        self._require_file()
        self.file = io.BytesIO()
        self.storage.openAsStream(self.name, self.file)
        return self
