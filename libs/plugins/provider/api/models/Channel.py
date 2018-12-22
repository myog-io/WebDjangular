from django.db import models
from libs.plugins.store.api.models.Product import Product
from webdjango.models.AbstractModels import BaseModel
from django.contrib.postgres.fields import ArrayField



class Channel(BaseModel):
    name = models.CharField(max_length=255)
    logo = models.CharField(null=True, blank=True, max_length=512)
    groups = ArrayField(models.CharField(max_length=10, blank=True)) #Will Treat as a Tag
    types = ArrayField(models.CharField(max_length=10, blank=True)) #Will Treat as a Tag
    number = models.FloatField(unique=True)
    position = models.PositiveIntegerField()
    products = models.ForeignKey(Product, related_name='channels', on_delete=models.CASCADE)

    class Meta:
        db_table = 'provider_channel'
        ordering = ['-created']
