from libs.core.media.api.models.Media import Media
from libs.plugins.store.api import defaults
from libs.plugins.store.api.models.Product import BaseProduct, Product, \
    ProductAttribute, ProductCategory, ProductType
from rest_framework_json_api import serializers
from rest_framework_json_api.relations import ResourceRelatedField
from webdjango.models.CoreConfig import CoreConfigInput
from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer
from .MoneySerializer import MoneyField


class ProductAttributeSerializer(WebDjangoSerializer):
    included_serializers = {
        # 'product_type': 'libs.plugins.store.api.serializers.ProductSerializer.ProductTypeSerializer',
        # 'addons': 'libs.plugins.store.api.serializers.ProductSerializer.ProductSerializer',
        # 'categories': 'libs.plugins.store.api.serializers.ProductSerializer.ProductCategorySerializer',
        # 'bundle_products': 'libs.plugins.store.api.serializers.ProductSerializer.ProductSerializer',
    }

    class Meta:
        fields = '__all__'
        model = ProductAttribute


class ProductTypeSerializer(WebDjangoSerializer):
    included_serializers = {
        'data': 'libs.plugins.store.api.serializers.ProductSerializer.ProductAttributeSerializer',
    }
    weight = serializers.CharField(required=False)

    data = ResourceRelatedField(
        many=True,
        queryset=ProductAttribute.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='product-type-relationships',
        related_link_view_name='product-type-related',
        required=False,
    )

    class Meta:
        model = ProductType
        fields = '__all__'


class ProductCategorySerializer(WebDjangoSerializer):
    name = serializers.CharField()
    slug = serializers.SlugField()
    description = serializers.CharField()

    class Meta:
        model = ProductCategory
        fields = '__all__'


class ProductSerializer(WebDjangoSerializer):
    pricing_list = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                              decimal_places=defaults.DEFAULT_DECIMAL_PLACES)
    pricing_sale = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                              decimal_places=defaults.DEFAULT_DECIMAL_PLACES, required=False)
    cost = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                      decimal_places=defaults.DEFAULT_DECIMAL_PLACES, required=False)

    price = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                       decimal_places=defaults.DEFAULT_DECIMAL_PLACES, read_only=True)

    base_price = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                       decimal_places=defaults.DEFAULT_DECIMAL_PLACES, read_only=True)

    weight = serializers.CharField(required=False)
    included_serializers = {
        'product_type': 'libs.plugins.store.api.serializers.ProductSerializer.ProductTypeSerializer',
        'addons': 'libs.plugins.store.api.serializers.ProductSerializer.ProductSerializer',
        'categories': 'libs.plugins.store.api.serializers.ProductSerializer.ProductCategorySerializer',
        'bundle_products': 'libs.plugins.store.api.serializers.ProductSerializer.ProductSerializer',
    }

    #  product class BUNDLE
    variant_parent = ResourceRelatedField(
        many=True,
        queryset=Product.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='product-relationships',
        related_link_view_name='product-related',
        required=False,
    )
    variant_attributes = serializers.JSONField(required=False)

    #  product class BUNDLE
    bundle_products = ResourceRelatedField(
        many=True,
        queryset=Product.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='product-relationships',
        related_link_view_name='product-related',
        required=False,
    )

    categories = ResourceRelatedField(
        many=True,
        queryset=ProductCategory.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='product-relationships',
        related_link_view_name='product-related',
        required=False,
    )

    addons = ResourceRelatedField(
        many=True,
        queryset=Product.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='product-relationships',
        related_link_view_name='product-related',
        required=False,
    )

    attributes = serializers.JSONField(required=False)

    product_type = ResourceRelatedField(
        many=False,
        queryset=ProductType.objects,
        required=False,
        related_link_url_kwarg='pk',
        self_link_view_name='product-relationships',
        related_link_view_name='product-related',
    )

    images = ResourceRelatedField(
        many=True,
        queryset=Media.objects,
        required=False,
        related_link_url_kwarg='pk',
        self_link_view_name='product-relationships',
        related_link_view_name='product-related',
    )
    data = serializers.JSONField(required=False)

    class Meta:
        model = Product
        fields = '__all__'
