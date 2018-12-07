from libs.plugins.store.api.models.Product import BaseProduct, Product, \
    ProductCategory, ProductDimensions, ProductPricing, ProductShipping, \
    ProductType
from rest_framework_json_api import serializers
from rest_framework_json_api.relations import ResourceRelatedField
from webdjango.serializers.MongoSerializer import ArrayModelFieldSerializer, \
    ArrayReferenceFieldSerializer, EmbeddedSerializer, DocumentSerializer, EmbeddedModelFieldSerializer
from libs.plugins.store.api import defaults

class ProductTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductType
        fields = '__all__'


class ProductCategorySerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    slug = serializers.SlugField()
    description = serializers.CharField()

    class Meta:
        model = ProductCategory
        fields = '__all__'


class ProductDimensionsSerializer(EmbeddedSerializer):
    width = serializers.CharField()
    height = serializers.CharField()
    depth = serializers.CharField()

    class Meta:
        model = ProductDimensions
        fields = '__all__'


class ProductShippingSerializer(EmbeddedSerializer):
    weight = serializers.CharField()

    # TODO: EmbeddedSerializer
    # dimensions = EmbeddedSerializer(serializer=ProductDimensionsSerializer, blank=True)

    class Meta:
        model = ProductShipping
        fields = '__all__'


class ProductPricingSerializer(EmbeddedSerializer):
    list = serializers.DecimalField(
        max_digits=defaults.DEFAULT_MAX_DIGITS,
        decimal_places=defaults.DEFAULT_DECIMAL_PLACES
    )
    sale = serializers.DecimalField(
        max_digits=defaults.DEFAULT_MAX_DIGITS,
        decimal_places=defaults.DEFAULT_DECIMAL_PLACES
    )

    class Meta:
        model = ProductPricing
        fields = '__all__'



class BaseProductSerializer(EmbeddedSerializer):
    sku = serializers.CharField()
    type = serializers.CharField()
    name = serializers.CharField()
    slug = serializers.SlugField()
    description = serializers.CharField()

    available_on = serializers.DateTimeField(allow_null=True)

    track_inventory = serializers.BooleanField()
    quantity = serializers.IntegerField()
    quantity_allocated = serializers.IntegerField(allow_null=True)
    cost = serializers.DecimalField(
        max_digits=defaults.DEFAULT_MAX_DIGITS,
        decimal_places=defaults.DEFAULT_DECIMAL_PLACES
    )

    class Meta:
        model = BaseProduct
        fields = '__all__'


class ProductSerializer(DocumentSerializer):
    #  product class VARIANT
    variants = ArrayModelFieldSerializer(serializer=BaseProductSerializer, required=False)
    variant_attributes = serializers.JSONField(required=False)

    #  product class BUNDLE
    bundle_products = ArrayReferenceFieldSerializer(serializer='self', required=False)

    # TODO: ArrayReferenceSerializer
    # TODO:
    categories = ArrayReferenceFieldSerializer(serializer=ProductCategorySerializer, required=False)

    attributes = serializers.JSONField(required=False)
    pricing = EmbeddedModelFieldSerializer(
        required=False,
        serializer=ProductPricingSerializer
    )

    type = ResourceRelatedField(
        many=False,
        queryset=ProductType.objects,
        required=False,
        related_link_url_kwarg='pk',
        self_link_view_name='product-relationships'
    )

    class Meta:
        model = Product
        fields = '__all__'
