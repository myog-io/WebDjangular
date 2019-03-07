import io

from dirtyfields import DirtyFieldsMixin
from django.conf import settings
from django.db import models

from libs.core.media.api.configs import MEDIA_CONFIG_GROUP_SLUG, CONFIG_STORAGE_CLASS
from libs.core.media.api.fields.ChunkableFieldFile import ChunkableFieldFile
from libs.core.media.api.fields.RemoteFileField import RemoteFileField
from webdjango.models.AbstractModels import BaseModel
from webdjango.models.Core import CoreConfig


# Create your models here.


def media_path(instance, filename):
    import datetime
    import os.path
    now = datetime.datetime.now()
    media_config = CoreConfig.read(MEDIA_CONFIG_GROUP_SLUG)
    # TODO Check if file exits
    if media_config and media_config[CONFIG_STORAGE_CLASS]:
        return '{0}-{1}-{3}'.format(now.year, now.month, filename)
    # file will be uploaded to MEDIA_ROOT/year/month/<filename>
    count = 0
    original_file_name = str(filename)
    path = os.path.join(os.path.join(settings.MEDIA_ROOT, str(now.year)), str(now.month))

    while os.path.isfile(os.path.join(str(path), str(filename))):
        count = count + 1
        filename = '{0}-{1}'.format(count, original_file_name)
    return '{0}/{1}/{2}'.format(now.year, now.month, filename)


class Media(BaseModel, DirtyFieldsMixin):
    """
    Media Table
    """

    class Meta:
        ordering = ['-created']
        db_table = 'medias'
        permissions = (("download_media", "Can Download Media"),)

    alt = models.CharField(null=True, max_length=255)
    file = RemoteFileField(null=True, blank=True,
                           upload_to=media_path, attr_class=ChunkableFieldFile)
    content_type = models.CharField(max_length=255, null=True, blank=True)
    extension = models.CharField(max_length=16, null=True, blank=True)
    bytes = models.BigIntegerField(null=True, blank=True)
    current_chunk = models.IntegerField(null=True, blank=True, default=None)
    total_chunks = models.IntegerField(null=True, blank=True, default=None)

    @property
    def upload_complete(self):
        return self.current_chunk == self.total_chunks

    @property
    def sendComplete(self):
        return self.total_chunks == self.current_chunk

    def get_absolute_url(self):
        # TODO: Return Correct Absolute URL
        return "absolute_url_image";

    def isImage(self):
        if self.content_type:
            exploded = self.content_type.split("/")

            if exploded[0]:
                if exploded[0] == "image":
                    return True

        # return false by default
        return False

    def generateThumbnail(self, width=None, height=None):
        if self.isImage() is True:
            fileExtension = FileTools().getExtension(self.content_type)

            img = Image.open(self.file)

            oldWidth = img.size[0]
            oldHeight = img.size[1]

            if width is not None:
                newWidth = width
                newHeight = newWidth * oldHeight / oldWidth
            elif height is not None:
                newHeight = height
                newWidth = newHeight * oldWidth / oldHeight
            else:
                # defaults to 300 px in width
                newWidth = 300
                newHeight = newWidth * oldHeight / oldWidth

            img.thumbnail((newWidth, newHeight))
            # is has double (()) because the inside () is actually a list
            f = io.BytesIO(b"")
            img.save(f, fileExtension.upper())
            # Image class expects the extension in uppercase

            return f
        else:
            return False

    def rotateImage(self, angle=90, imageBlob=None, saveRotatedImage=False):
        if self.isImage() is True:
            fileExtension = FileTools().getExtension(self.content_type)

            img = Image.open(self.file)

            # transpose does not creates a weird balck background
            if angle == 90:
                img = img.transpose(Image.ROTATE_90)
            elif angle == 180:
                img = img.transpose(Image.ROTATE_180)
            elif angle == 270:
                img = img.transpose(Image.ROTATE_270)
            else:
                img = img.rotate(angle)

            f = io.BytesIO(b"")
            img.save(f, fileExtension.upper())
            # Image class expects the extension in uppercase

            if saveRotatedImage is True:
                self.file.save(str(self.file), f)

            return self.file
        else:
            return False
