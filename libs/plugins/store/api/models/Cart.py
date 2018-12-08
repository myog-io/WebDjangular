from uuid import uuid4

from django_prices.models import MoneyField
from djongo import models
from djongo.models.json import JSONField

from libs.core.users.api.models.User import User
from libs.core.utils.api.money import zero_money
from libs.plugins.store.api import defaults
from libs.core.utils.api.models.Address import Address


class CartItem(models.Model):
    # product =
    quantity = models.PositiveIntegerField(default=1)
    data = JSONField(blank=True, default=dict)

    class Meta:
        abstract = True


class Cart(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    email = models.EmailField(blank=True, default='')

    token = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    quantity = models.PositiveIntegerField(default=0)

    billing_address = models.EmbeddedModelField(model_container=Address, blank=True)
    shipping_address = models.EmbeddedModelField(model_container=Address, blank=True)

    # shipping_method = models.ForeignKey(ShippingMethod,
    #                                     blank=True, null=True, related_name='carts',
    #                                     on_delete=models.SET_NULL)

    note = models.TextField(blank=True, default='')

    discount_amount = MoneyField(currency=defaults.DEFAULT_CURRENCY,
                                 max_digits=defaults.DEFAULT_MAX_DIGITS,
                                 decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
                                 default=zero_money)
    discount_name = models.CharField(max_length=255, blank=True, null=True)

    voucher_code = models.CharField(max_length=12, blank=True, null=True)

    items = models.ArrayModelField(model_container=CartItem)

    class Meta:
        ordering = ['-pk']
