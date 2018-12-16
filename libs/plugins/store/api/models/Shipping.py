from django_measurement.models import MeasurementField
from django_prices.models import MoneyField
from djongo import models

from libs.plugins.store.api import defaults
from webdjango.models.AbstractModels import ActiveModel, BaseModel
from django_countries.fields import CountryField
from measurement.measures import Weight
from libs.core.utils.api.weight import WeightUnits, zero_weight


class ShippingMethodType:
    PRICE_BASED = 'price'
    WEIGHT_BASED = 'weight'

    CHOICES = [
        (PRICE_BASED, 'Price based shipping'),
        (WEIGHT_BASED, 'Weight based shipping')
    ]


class ShippingZone(BaseModel):
    name = models.CharField(max_length=100)
    countries = CountryField(multiple=True, default=[], blank=True)
    default = models.BooleanField(default=False)

    class Meta:
        abstract = True

    def __str__(self):
        return self.name


class ShippingMethod(BaseModel):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=30, choices=ShippingMethodType.CHOICES)
    price = MoneyField(currency=defaults.DEFAULT_CURRENCY,
                       max_digits=defaults.DEFAULT_MAX_DIGITS,
                       decimal_places=defaults.DEFAULT_DECIMAL_PLACES, default=0)
    # shipping_zone = models.EmbeddedModelField(model_container=ShippingZone)
    minimum_order_price = MoneyField(currency=defaults.DEFAULT_CURRENCY,
                                     max_digits=defaults.DEFAULT_MAX_DIGITS,
                                     decimal_places=defaults.DEFAULT_DECIMAL_PLACES, default=0, blank=True,
                                     null=True)
    maximum_order_price = MoneyField(currency=defaults.DEFAULT_CURRENCY,
                                     max_digits=defaults.DEFAULT_MAX_DIGITS,
                                     decimal_places=defaults.DEFAULT_DECIMAL_PLACES, blank=True, null=True)
    minimum_order_weight = MeasurementField(measurement=Weight, unit_choices=WeightUnits.CHOICES,
                                            default=zero_weight, blank=True, null=True)
    maximum_order_weight = MeasurementField(measurement=Weight, unit_choices=WeightUnits.CHOICES,
                                            blank=True, null=True)
    class Meta:
        ordering = ['-created']
