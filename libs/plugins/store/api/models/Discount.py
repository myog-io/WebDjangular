from django_prices.models import MoneyField
from django.db import models
from django.contrib.postgres.fields import JSONField

from libs.plugins.store.api import defaults
from webdjango.models.AbstractModels import ActiveModel, BaseModel


class DiscountValueType:
    FIXED = 'fixed'
    PERCENTAGE = 'percentage'
    TO_VALUE = 'to_value'

    CHOICES = [
        (FIXED, defaults.DEFAULT_CURRENCY),
        (PERCENTAGE, '%')
    ]


class CartRule(ActiveModel, BaseModel):
    name = models.CharField(max_length=255, null=True, blank=True)
    conditions = JSONField(default=None, blank=True, null=True)
    type = models.CharField(max_length=10,
                            choices=DiscountValueType.CHOICES,
                            default=DiscountValueType.FIXED)
    value = models.DecimalField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                                decimal_places=defaults.DEFAULT_DECIMAL_PLACES)

    voucher = models.CharField(max_length=12, unique=True, db_index=True)

    usage_limit = models.PositiveIntegerField(null=True, blank=True)
    used = models.PositiveIntegerField(default=0, editable=False)

    start = models.DateTimeField(null=False)
    end = models.DateTimeField(null=False)

    # if the discount is applied per order or individually to every product
    apply_once_per_order = models.BooleanField(default=False)

    # products = models.ManyToManyField('product.Product', blank=True)
    # collections = models.ManyToManyField('product.Collection', blank=True)
    # categories = models.ManyToManyField('product.Category', blank=True)


class CatalogRule(ActiveModel, BaseModel):
    name = models.CharField(max_length=255)
    conditions = JSONField(default=None, blank=True, null=True)
    type = models.CharField(max_length=10,
                            choices=DiscountValueType.CHOICES,
                            default=DiscountValueType.FIXED)
    value = models.DecimalField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                                decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
                                default=0)

    # products = models.ManyToManyField('product.Product', blank=True)
    # categories = models.ManyToManyField('product.Category', blank=True)
    # collections = models.ManyToManyField('product.Collection', blank=True)

    start = models.DateTimeField(null=False)
    end = models.DateTimeField(null=False)
