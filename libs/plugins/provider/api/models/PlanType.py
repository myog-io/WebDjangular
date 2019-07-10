from django.db import models
from django_mysql.models import ListCharField

from libs.plugins.store.api.models.Order import Order
from libs.plugins.store.api.models.Product import Product
from webdjango.models.AbstractModels import BaseModel


class PlanType(BaseModel):
    name = models.CharField(max_length=255)
    position = models.PositiveIntegerField()
    is_condo = models.BooleanField(default=False)
    is_business = models.BooleanField(default=False)
    products = models.ManyToManyField(Product, related_name="plan_types")
    orders = models.ManyToManyField(
        Order,
        related_name="plan_types"
    )
    @property
    def order_count(self):
        '''
        Return the Ammount of order count()
        '''
        return self.orders.count()

    class Meta:
        db_table = 'provider_plan_type'
        ordering = ['position']
