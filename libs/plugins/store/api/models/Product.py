from decimal import Decimal

from django.conf import settings
from django_measurement.models import MeasurementField
from django_prices.models import MoneyField
from djongo import models
from djongo.models.json import JSONField
from measurement.measures import Weight

from libs.core.utils.api.weight import zero_weight, WeightUnits
from libs.plugins.store.api import defaults
from webdjango.models.AbstractModels import ActiveModel, DateTimeModel


class ProductCategory(DateTimeModel, models.Model):
    name = models.CharField(max_length=128)
    slug = models.SlugField(max_length=128)
    description = models.TextField(blank=True)
    # parent = models.ForeignKey('self', null=True, blank=True, related_name='children', on_delete=models.CASCADE)

    i18n_fields = ['name', 'slug', 'description']

    def __str__(self):
        return self.name


class ProductDimensions(models.Model):
    # TODO: change to MeasuramentField
    width = models.CharField(max_length=32)
    height = models.CharField(max_length=32)
    depth = models.CharField(max_length=32)

    class Meta:
        abstract = True


class ProductShipping(models.Model):
    weight = MeasurementField(measurement=Weight,
                              unit_choices=WeightUnits.CHOICES,
                              default=zero_weight)
    dimensions = models.EmbeddedModelField(model_container=ProductDimensions, blank=True)

    class Meta:
        abstract = True


class ProductPricing(models.Model):
    list = MoneyField(currency=defaults.DEFAULT_CURRENCY,
                      max_digits=defaults.DEFAULT_MAX_DIGITS,
                      decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
                      blank=True)
    sale = MoneyField(currency=defaults.DEFAULT_CURRENCY,
                      max_digits=defaults.DEFAULT_MAX_DIGITS,
                      decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
                      blank=True)

    # TODO: tier prices

    class Meta:
        abstract = True


class Product(ActiveModel, DateTimeModel, models.Model):
    sku = models.CharField(max_length=32, unique=True)
    type = models.CharField(max_length=128)
    name = models.CharField(max_length=256)
    slug = models.SlugField(max_length=256)
    description = models.TextField(blank=True)

    available_on = models.DateTimeField(blank=True, null=True)

    track_inventory = models.BooleanField(default=True)
    quantity = models.IntegerField(default=Decimal(1))
    quantity_allocated = models.IntegerField(default=Decimal(0))
    cost = MoneyField(currency=defaults.DEFAULT_CURRENCY,
                      max_digits=defaults.DEFAULT_MAX_DIGITS,
                      decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
                      blank=True, null=True)

    # categories = models.ArrayReferenceField(to=ProductCategory, on_delete=models.CASCADE)

    pricing = models.EmbeddedModelField(model_container=ProductPricing)

    details = JSONField()

    i18n_fields = ['name', 'slug', 'description']


#  class ProductVariant(Product):
class ProductVariant(models.Model):
    # extend the Product model and can override every field

    # ForeignKeyproduct = models.ForeignKey(Product, related_name='variants', on_delete=models.CASCADE)
    variants = JSONField()


class ProductCollection(ActiveModel, DateTimeModel, models.Model):
    # products = models.ManyToManyField(Product, blank=True, related_name='collections')

    sku = models.CharField(max_length=32, unique=True)
    name = models.CharField(max_length=256)
    slug = models.SlugField(max_length=256)
    description = models.TextField(blank=True)

    available_on = models.DateField(blank=True, null=True)

    pricing = models.EmbeddedModelField(model_container=ProductPricing)

    i18n_fields = ['name', 'slug', 'description']
