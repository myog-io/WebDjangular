import hashlib
import uuid
import time
import random
import io
import sys

from django.core.files.storage import Storage

from django.core.exceptions import ValidationError

from azure.common import AzureHttpError
from azure.storage.blob import AppendBlobService
from azure.storage.blob import BlockBlobService, ContainerPermissions
from azure.storage.blob.baseblobservice import BaseBlobService

from django.utils.deconstruct import deconstructible
from datetime import datetime, timedelta


@deconstructible
class AzureBlobStorage(Storage):
    # in bytes, azure actual limit is 4Mb, we do 3 to be safe
    AZURE_CHUNK_SIZE_LIMIT = 1024 * 1024

    def __init__(self, accountName=None, accountKey=None, containerName=None):
        self.services = {
            'base_blob': BaseBlobService(account_name=accountName, account_key=accountKey),
            'block_blob': BlockBlobService(account_name=accountName, account_key=accountKey),
            'append_blob': AppendBlobService(account_name=accountName, account_key=accountKey),
        }
        if containerName == None:
            raise ValidationError(
                "You must set which container you want to use")

        self.containerName = containerName

    def delete(self, name):
        try:
            return self.services['block_blob'].delete_blob(self.containerName, name)
        except AzureHttpError:
            print("Azure Http Error, File previus deleted")

    def open(self, name, mode='rb', startByte=None, endByte=None, progress_callback=None):
        if startByte != None and endByte != None:
            blob = self.services['block_blob'].get_blob_to_bytes(
                container_name=self.containerName,
                blob_name=name,
                start_range=startByte,
                end_range=endByte,
                progress_callback=progress_callback
            )
        else:
            blob = self.services['block_blob'].get_blob_to_bytes(
                container_name=self.containerName,
                blob_name=name,
                progress_callback=progress_callback
            )

        if hasattr(blob, 'content'):
            return io.BytesIO(blob.content)
        else:
            return b""

    def openAsStream(self, name, stream, progress_callback=None):
        self.services['block_blob'].get_blob_to_stream(
            container_name=self.containerName,
            blob_name=name,
            stream=stream,
            progress_callback=progress_callback,
        )

    def exists(self, name):
        print("exists() got called")
        return False

    def listdir(self):
        print("listdir() got called")
        return []

    def size(self, name):
        props = self.get_properties(name)
        return props.content_length

    def url(self, name):
        return name

    def urlWithSasAuth(self, name, ip=None, nameToGive=None):
        props = self.get_properties(name)

        if ip == '127.0.0.1':
            ip = None

        url = self.services['block_blob'].make_blob_url(
            container_name=self.containerName, blob_name=name)

        try:
            content_type = props.content_settings.content_type
        except:
            content_type = "application/octet-stream"

        if nameToGive == None:
            nameToGive = name

        sas_key = self.services['block_blob'].generate_blob_shared_access_signature(
            container_name=self.containerName,
            blob_name=name,
            permission=ContainerPermissions.READ,
            expiry=datetime.utcnow() + timedelta(hours=1),
            start=datetime.utcnow() - timedelta(hours=1),
            protocol='https',
            ip=ip,
            content_type=content_type,
            content_disposition='attachment; filename="' +
            str(nameToGive) + '"'
        )
        url = url + '?' + sas_key
        return url

    def save(self, name, contents, max_length=None, progress_callback=None):
        self.services['append_blob'].create_blob(self.containerName, name)
        self.append_to_blob(name, contents, progress_callback)
        return name

    def append(self, name, contents, progress_callback=None):
        if hasattr(contents, 'file'):
            if contents.size > AzureBlobStorage.AZURE_CHUNK_SIZE_LIMIT:
                contents.file.seek(0)
                stop = False
                totalRead = 0

                totalSent = 0
                lastCurrent = 0

                while stop == False:
                    if totalRead + AzureBlobStorage.AZURE_CHUNK_SIZE_LIMIT > contents.size:
                        readSize = contents.size - totalRead
                    else:
                        readSize = AzureBlobStorage.AZURE_CHUNK_SIZE_LIMIT

                    self.services['append_blob'].append_blob_from_bytes(
                        self.containerName, name, contents.file.read(readSize))
                    totalRead += readSize

                    if progress_callback != None:
                        progress_callback(totalRead, contents.size)

                    if readSize != AzureBlobStorage.AZURE_CHUNK_SIZE_LIMIT:
                        stop = True

            else:
                self.services['append_blob'].append_blob_from_bytes(
                    self.containerName, name, contents.file.read(), progress_callback=progress_callback)
        else:
            # binary data
            self.services['append_blob'].append_blob_from_bytes(
                self.containerName, name, contents.getvalue(), progress_callback=progress_callback)

        return name

    def append_to_text(self, name, contents):
        self.services['append_blob'].append_blob_from_text(
            self.containerName, name, contents)

    def get_valid_name(self, name=''):
        uniqueName = str(uuid.uuid4()) + str(time.time) + str(random.random())
        uniqueName = hashlib.md5(uniqueName.encode('utf-8')).hexdigest()

        extension = name.split(".")

        if len(extension) > 1:
            uniqueName += "." + str(extension.pop())

        return uniqueName

    def get_properties(self, name=None):
        if name != None and name != '':
            baseBlob = self.services['base_blob'].get_blob_properties(
                self.containerName, name)
            return baseBlob.properties

        return None

    def listContainer(self, prefix):
        return self.services['base_blob'].list_blobs(self.containerName, prefix)
