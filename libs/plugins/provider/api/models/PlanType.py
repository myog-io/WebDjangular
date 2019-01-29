from django.db import models
from libs.plugins.store.api.models.Product import Product
from webdjango.models.AbstractModels import BaseModel
from django_mysql.models import ListCharField


class PlanType(BaseModel):
    name = models.CharField(max_length=255)
    position = models.PositiveIntegerField()
    is_condo = models.BooleanField(default=False)
    is_business = models.BooleanField(default=False)
    products = models.ManyToManyField(Product, related_name="plan_types")

    class Meta:
        db_table = 'provider_plan_type'
        ordering = ['position']
