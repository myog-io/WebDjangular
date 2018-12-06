from rest_framework_json_api import serializers

from libs.plugins.store.api.models.Product import ProductPricing, ProductDimensions, ProductShipping, Product, \
    ProductCategory
from webdjango.serializers.MongoSerializer import EmbeddedSerializer, ArrayModelField


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
    list = serializers.CharField()
    sale = serializers.CharField()

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
    cost = serializers.CharField()


class ProductSerializer(serializers.ModelSerializer):
    #  product class VARIANT
    # variants = ArrayModelField(serializer=BaseProductSerializer)
    # variant_attributes = serializers.JSONField()

    #  product class BUNDLE
    # bundle_products = ArrayReferenceField(to='Product', on_delete=None)

    # TODO: ArrayReferenceSerializer
    # TODO:
    # categories = (to=ProductCategory)

    # TODO: EmbeddedSerializer
    # pricing = EmbeddedSerializer(serializer=ProductPricingSerializer)
    # pricing = ProductPricingSerializer()

    # details = serializers.JSONField(allow_null=True)

    class Meta:
        model = Product
        fields = '__all__'
