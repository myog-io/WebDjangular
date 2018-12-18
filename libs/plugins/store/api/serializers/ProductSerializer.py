from libs.plugins.store.api.models.Product import BaseProduct, Product, \
    ProductCategory, ProductDimensions, ProductPricing, ProductShipping, \
    ProductType, ProductAttribute, ProductAttributeOption
from rest_framework_json_api import serializers
from rest_framework_json_api.relations import ResourceRelatedField
from webdjango.serializers.MongoSerializer import ArrayModelFieldSerializer, \
    EmbeddedSerializer, DocumentSerializer, EmbeddedModelFieldSerializer
from libs.plugins.store.api import defaults
from webdjango.models.CoreConfig import CoreConfigInput


class ProductAttributeOptionSerializer(EmbeddedSerializer):
    label = serializers.CharField()
    value = serializers.CharField()

    class Meta:
        model = ProductAttributeOption

    def __str__(self):
        return '%s object (%s)' % (self.__class__.__name__, self.label)


class ProductAttributeSerializer(EmbeddedSerializer):
    code = serializers.SlugField(required=True)
    name = serializers.CharField()
    required = serializers.BooleanField(required=False)
    type = serializers.CharField()
    options = ArrayModelFieldSerializer(serializer=ProductAttributeOptionSerializer, required=False)

    class Meta:
        model = ProductAttribute

    def __str__(self):
        return '%s object (%s)' % (self.__class__.__name__, self.name)


class ProductTypeSerializer(DocumentSerializer):

    attributes = ArrayModelFieldSerializer(serializer=ProductAttributeSerializer, required=False)
    variant_attributes = ArrayModelFieldSerializer(serializer=ProductAttributeSerializer, required=False)

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
        decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
    )
    sale = serializers.DecimalField(
        max_digits=defaults.DEFAULT_MAX_DIGITS,
        decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
        required=False,
        allow_null=True,
    )

    class Meta:
        model = ProductPricing
        fields = '__all__'


class BaseProductSerializer(EmbeddedSerializer):
    sku = serializers.CharField()
    type = serializers.CharField()
    name = serializers.CharField()
    slug = serializers.SlugField()
    description = serializers.CharField(allow_null=True)

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
    included_serializers = {
        'product_type': 'libs.plugins.store.api.serializers.ProductSerializer.ProductTypeSerializer',

    }

    #  product class VARIANT
    variants = ArrayModelFieldSerializer(serializer=BaseProductSerializer, required=False)
    variant_attributes = serializers.JSONField(required=False)

    #  product class BUNDLE
    bundle_products = ResourceRelatedField(
        many=True,
        queryset=Product.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='product-relationships',
        required=False,
    )

    # TODO: ArrayReferenceSerializer
    # TODO:
    categories = ResourceRelatedField(
        many=True,
        queryset=ProductCategory.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='product-relationships',
        required=False,
    )

    addons = ResourceRelatedField(
        many=True,
        queryset=Product.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='product-relationships',
        required=False,
    )

    attributes = serializers.JSONField(required=False)
    pricing = EmbeddedModelFieldSerializer(
        required=False,
        serializer=ProductPricingSerializer
    )

    product_type = ResourceRelatedField(
        many=False,
        queryset=ProductType.objects,
        required=False,
        related_link_url_kwarg='pk',
        self_link_view_name='product-relationships'
    )

    class Meta:
        model = Product
        fields = '__all__'
