from webdjango.models.AbstractModels import BaseModel
from libs.core.media.api.models.Media import media_path, ChunkableFieldFile, RemoteFileField
from djongo import models
from libs.plugins.store.api.models.Product import Product


class Channel(BaseModel):
    name = models.CharField(max_length=255)
    logo = RemoteFileField(null=True, blank=True, upload_to=media_path, attr_class=ChunkableFieldFile)
    groups = models.ListField( max_length=255) #Will Treat as a Tag
    types = models.ListField(max_length=255) #Will Treat as a Tag
    number = models.FloatField()
    position = models.IntegerField()
    products = models.ArrayReferenceField(to=Product, on_delete=models.SET_NULL, related_name='channels', null=True)

    class Meta:
        db_table = 'provider_channel'
        ordering = ['-created']
