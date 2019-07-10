from django.db import models

from libs.plugins.store.api.models.Order import Order
from webdjango.models.AbstractModels import BaseModel


class Reseller(BaseModel):
    name = models.CharField(max_length=255)
    taxvat = models.CharField(
        max_length=15, unique=True, blank=True, null=True)
    email = models.EmailField(unique=True, blank=True, null=True)
    is_employee = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    orders = models.ManyToManyField(
        Order,
        related_name="resellers"
    )
    @property
    def order_count(self):
        '''
        Return the Ammount of order count()
        '''
        return self.orders.count()

    class Meta:
        db_table = 'provider_reseller'
        ordering = ['-created']
