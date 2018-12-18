from djongo import models
from libs.plugins.store.api.models.Product import Product
from webdjango.models.AbstractModels import BaseModel



class Channel(BaseModel):
    name = models.CharField(max_length=255)
    logo = models.CharField(null=True, blank=True, max_length=512)
    groups = models.ListField( max_length=255, null=True, blank=True) #Will Treat as a Tag
    types = models.ListField(max_length=255, null=True, blank=True) #Will Treat as a Tag
    number = models.FloatField(unique=True)
    position = models.IntegerField()
    products = models.ArrayReferenceField(to=Product, on_delete=models.SET_NULL, related_name='channels', null=True)

    class Meta:
        db_table = 'provider_channel'
        ordering = ['-created']
