from decimal import Decimal

from django.db import models
from django_measurement.models import MeasurementField
from django_prices.models import MoneyField
from measurement.measures import Weight

from libs.core.media.api.models.Media import Media
from libs.plugins.store.api import defaults
from webdjango.models.AbstractModels import ActiveModel, BaseModel, \
    PermalinkModel
from webdjango.models.CoreConfig import CoreConfigInput
from webdjango.models.TranslationModel import TranslationModel
from webdjango.utils.weight import WeightUnits, zero_weight
from ..exceptions import InsufficientStock


class ProductClasses:
    SIMPLE = 'simple'
    VARIANT = 'variant'
    ADDON = 'addon'
    BUNDLE = 'bundle'

    CHOICES = [
        (SIMPLE, 'simple'),
        (VARIANT, 'variant'),
        (ADDON, 'addon'),
        (BUNDLE, 'bundle')
    ]


class ProductCategory(PermalinkModel, TranslationModel):
    name = models.CharField(max_length=128)
    description = models.TextField(blank=True)
    parent = models.ForeignKey('self', null=True, blank=True, related_name='children', on_delete=models.CASCADE)
    background_image = models.ForeignKey(Media, blank=True, null=True, on_delete=models.SET_NULL)
    i18n_fields = ['name', 'slug', 'description']

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return '%s object (%s)' % (self.__class__.__name__, self.name)


class ProductAttributeOptions(TranslationModel):
    code = models.SlugField()
    name = models.CharField(max_length=255)
    is_default = models.BooleanField(default=False)
    attribute = models.ForeignKey('ProductAttribute', related_name='options', on_delete=models.CASCADE)
    i18n_fields = ['name']

    class Meta:
        ordering = ['-created']


class ProductAttribute(TranslationModel):
    code = models.SlugField(unique=True)
    name = models.CharField(max_length=255)
    i18n_fields = ['name']
    is_variant = models.BooleanField(default=False)
    required = models.BooleanField(default=False)
    class_type = models.CharField(max_length=32, choices=CoreConfigInput.CONFIG_FIELD_TYPES,
                            default=CoreConfigInput.FIELD_TYPE_TEXT)

    class Meta:
        ordering = ['-created']


class ProductType(BaseModel):
    product_class = models.CharField(
        max_length=32, choices=ProductClasses.CHOICES, default=ProductClasses.SIMPLE)
    name = models.CharField(max_length=128)
    code = models.SlugField(max_length=64, unique=True)
    has_variants = models.BooleanField(default=True)
    is_shipping_required = models.BooleanField(default=False)

    data = models.ManyToManyField(ProductAttribute)

    weight = MeasurementField(
        measurement=Weight, unit_choices=WeightUnits.CHOICES,
        default=zero_weight)

    class Meta:
        ordering = ['-created']


class BaseProduct(ActiveModel, TranslationModel):
    sku = models.CharField(max_length=32, unique=True)
    name = models.CharField(max_length=256)
    description = models.TextField(blank=True, null=True)

    available_on = models.DateTimeField(blank=True, null=True)
    images = models.ManyToManyField(Media)

    track_inventory = models.BooleanField(default=True)
    quantity = models.IntegerField(default=Decimal(1))
    quantity_allocated = models.IntegerField(default=Decimal(0))
    cost = MoneyField(
        'list', currency=defaults.DEFAULT_CURRENCY, max_digits=defaults.DEFAULT_MAX_DIGITS,
        decimal_places=defaults.DEFAULT_DECIMAL_PLACES)
    pricing_list = MoneyField(
        'list', currency=defaults.DEFAULT_CURRENCY, max_digits=defaults.DEFAULT_MAX_DIGITS,
        decimal_places=defaults.DEFAULT_DECIMAL_PLACES)
    pricing_sale = MoneyField(
        'sale', currency=defaults.DEFAULT_CURRENCY, max_digits=defaults.DEFAULT_MAX_DIGITS,
        decimal_places=defaults.DEFAULT_DECIMAL_PLACES)

    weight = MeasurementField(measurement=Weight,
                              unit_choices=WeightUnits.CHOICES,
                              default=zero_weight)
    shipping_width = models.CharField(max_length=32)
    shipping_height = models.CharField(max_length=32)
    shipping_depth = models.CharField(max_length=32)

    i18n_fields = ['name', 'slug', 'description']

    class Meta:
        abstract = True


class Product(BaseProduct):
    product_class = models.CharField(
        max_length=32, choices=ProductClasses.CHOICES, default=ProductClasses.SIMPLE)
    product_type = models.ForeignKey(
        ProductType, on_delete=models.SET_NULL, blank=True, null=True)

    #  product class VARIANT
    variant_parent = models.ForeignKey('Product', related_name='variant', on_delete=models.CASCADE, blank=True,
                                       null=True)

    #  product class BUNDLE
    bundle_products = models.ManyToManyField('Product', related_name='bundle_parent')

    categories = models.ManyToManyField('ProductCategory', related_name='products')

    addons = models.ManyToManyField('Product', related_name='addon_parent')

    class Meta:
        ordering = ['-created']

    @property
    def quantity_available(self):
        # TODO: quantity available based on Children
        return max(self.quantity - self.quantity_allocated, 0)

    def check_quantity(self, quantity):
        """Check if there is at least the given quantity in stock
        if stock handling is enabled.
        """
        if self.track_inventory and quantity > self.quantity_available:
            raise InsufficientStock(self)

    @property
    def base_price(self):
        # TODO: Check Based on Selected Children
        return self.pricing_sale or self.pricing_list

    @property
    def is_shipping_required(self) -> bool:
        # TODO: Based on the Product Class
        return True

    @property
    def is_in_stock(self) -> bool:
        return self.quantity_available > 0


class ProductAttributeValue(BaseModel):
    product = models.ForeignKey(Product, related_name='attributes', on_delete=models.CASCADE)
    value = models.CharField(max_length=255, blank=True, default='')
