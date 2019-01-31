from webdjango.models.AbstractModels import BaseModel
from django.db import models
from libs.plugins.store.api.models.Order import Order


class Reseller(BaseModel):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    orders = models.ManyToManyField(
        Order,
        related_name="resellers"
    )

    class Meta:
        db_table = 'provider_reseller'
        ordering = ['-created']
