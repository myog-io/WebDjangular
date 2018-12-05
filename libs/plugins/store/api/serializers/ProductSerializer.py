from libs.plugins.store.api.models.Product import ProductPricing, ProductDimensions, ProductShipping, Product, \
    ProductVariant, ProductCollection

from rest_framework_json_api import serializers
from webdjango.serializers.MongoSerializer import EmbeddedSerializer, ArrayModelField


class ProductCategorySerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    slug = serializers.SlugField()
    description = serializers.CharField()
    # parent = serializers.RelatedField()


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
    list = serializers.CharField()
    sale = serializers.CharField()

    class Meta:
        model = ProductPricing
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    sku = serializers.CharField()
    type = serializers.CharField()
    name = serializers.CharField()
    slug = serializers.SlugField()
    description = serializers.CharField()

    # available_on = serializers.DateTimeField(allow_null=True)

    track_inventory = serializers.BooleanField()
    quantity = serializers.IntegerField()
    quantity_allocated = serializers.IntegerField(allow_null=True)
    cost = serializers.CharField()

    # TODO: ArrayReferenceSerializer
    # categories = ArrayReferenceSerializer(to=ProductCategory)

    # TODO: EmbeddedSerializer
    # pricing = EmbeddedSerializer(serializer=ProductPricingSerializer)

    # details = serializers.JSONField(allow_null=True)

    class Meta:
        model = Product
        fields = '__all__'


class ProductVariantSerializer(ProductSerializer):
    # product = serializers.RelatedField()
    variants = serializers.JSONField()

    class Meta:
        model = ProductVariant
        fields = '__all__'


class ProductCollectionSerializer(serializers.ModelSerializer):
    sku = serializers.CharField()
    name = serializers.CharField()
    slug = serializers.SlugField()
    description = serializers.CharField()

    available_on = serializers.DateTimeField()

    # TODO: EmbeddedSerializer
    # pricing = EmbeddedSerializer(serializer=ProductPricingSerializer)

    class Meta:
        model = ProductCollection
        fields = '__all__'
