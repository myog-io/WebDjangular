from django.db import models
from libs.plugins.store.api.models.Product import Product
from webdjango.models.AbstractModels import BaseModel
from django_mysql.models import ListCharField


class Channel(BaseModel):
    name = models.CharField(max_length=255)
    logo = models.CharField(null=True, blank=True, max_length=512)
    groups = ListCharField(
        base_field=models.CharField(max_length=20),
        size=50,
        max_length=(50 * 21),
        null=True,
        blank=True
    )  # Will Treat as a Tag
    types = ListCharField(
        base_field=models.CharField(max_length=20),
        size=50,
        max_length=(50 * 21),
        null=True,
        blank=True  # 6 * 10 character nominals, plus commas
    )  # Will Treat as a Tag
    number = models.FloatField(unique=True)
    position = models.PositiveIntegerField()
    products = models.ManyToManyField(Product,related_name="channels")

    class Meta:
        db_table = 'provider_channel'
        ordering = ['-created']
