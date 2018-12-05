from enum import Enum
from decimal import Decimal
from uuid import uuid4
from djongo import models
from django.utils.timezone import now
from djongo.models.json import JSONField
from django_prices.models import MoneyField, TaxedMoneyField
from django import forms
from django.conf import settings
from webdjango.models.AbstractModels import DateTimeModel

from libs.core.users.api.models.User import User
from libs.plugins.store.api.models.Address import Address
from libs.core.utils.api.weight import zero_weight
from libs.core.utils.api.money import zero_money



class CartItem(models.Model):

    #product =
    quantity = models.PositiveIntegerField(default=1)
    data = JSONField(blank=True, default=dict)

    class Meta:
        abstract = True

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    email = models.EmailField(blank=True, default='')

    token = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    quantity = models.PositiveIntegerField(default=0)

    billing_address = models.EmbeddedModelField(model_container=Address, blank=True)
    shipping_address = models.EmbeddedModelField(model_container=Address, blank=True)

    # shipping_method = models.ForeignKey(ShippingMethod,
    #                                     blank=True, null=True, related_name='carts',
    #                                     on_delete=models.SET_NULL)

    note = models.TextField(blank=True, default='')

    discount_amount = MoneyField(currency=settings.DEFAULT_CURRENCY,
                                 max_digits=settings.DEFAULT_MAX_DIGITS,
                                 decimal_places=settings.DEFAULT_DECIMAL_PLACES,
                                 default=zero_money)
    discount_name = models.CharField(max_length=255, blank=True, null=True)

    voucher_code = models.CharField(max_length=12, blank=True, null=True)

    items = models.ArrayModelField(model_container=CartItem)













