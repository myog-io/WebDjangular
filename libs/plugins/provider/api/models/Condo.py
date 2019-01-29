from webdjango.models.AbstractModels import BaseModel
from django.db import models
from .City import City
from libs.plugins.store.api.models.Product import Product


class Condo(BaseModel):
    name = models.CharField(max_length=255)
    city = models.ForeignKey(to=City, on_delete=models.CASCADE, related_name='condos')
    products = models.ManyToManyField(Product, related_name='condos')

    class Meta:
        db_table = 'provider_condo'
        ordering = ['-created']
