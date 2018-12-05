from django_prices.models import MoneyField
from djongo import models

from libs.plugins.store.api import defaults
from webdjango.models.AbstractModels import ActiveModel, DateTimeModel


class DiscountValueType:
    FIXED = 'fixed'
    PERCENTAGE = 'percentage'

    CHOICES = [
        (FIXED, defaults.DEFAULT_CURRENCY),
        (PERCENTAGE, '%')
    ]


class VoucherType:
    PRODUCT = 'product'
    COLLECTION = 'collection'
    CATEGORY = 'category'
    SHIPPING = 'shipping'
    VALUE = 'value'

    CHOICES = [
        (VALUE, 'All products'),
        (PRODUCT, 'Specific products'),
        (COLLECTION, 'Specific collections of products'),
        (CATEGORY, 'Specific categories of products'),
        (SHIPPING, 'Shipping')
    ]


class Voucher(ActiveModel, DateTimeModel, models.Model):
    type = models.CharField(max_length=20, choices=VoucherType.CHOICES, default=VoucherType.VALUE)
    name = models.CharField(max_length=255, null=True, blank=True)
    code = models.CharField(max_length=12, unique=True, db_index=True)

    usage_limit = models.PositiveIntegerField(null=True, blank=True)
    used = models.PositiveIntegerField(default=0, editable=False)

    start = models.DateTimeField(null=False)
    end = models.DateTimeField(null=False)

    # if the discount is applied per order or individually to every product
    apply_once_per_order = models.BooleanField(default=False)

    discount_value_type = models.CharField(max_length=10,
                                           choices=DiscountValueType.CHOICES,
                                           default=DiscountValueType.FIXED)
    discount_value = models.DecimalField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                                         decimal_places=defaults.DEFAULT_DECIMAL_PLACES)

    min_amount_spent = MoneyField(currency=defaults.DEFAULT_CURRENCY,
                                  max_digits=defaults.DEFAULT_MAX_DIGITS,
                                  decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
                                  null=True, blank=True)

    # products = models.ManyToManyField('product.Product', blank=True)
    # collections = models.ManyToManyField('product.Collection', blank=True)
    # categories = models.ManyToManyField('product.Category', blank=True)


class Sale(ActiveModel, DateTimeModel, models.Model):
    name = models.CharField(max_length=255)
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
