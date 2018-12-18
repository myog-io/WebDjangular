
from rest_framework_json_api import serializers
from rest_framework_json_api.relations import ResourceRelatedField

from libs.core.cms.api.models.Block import Block
from libs.plugins.store.api.models.Product import Product
from libs.plugins.store.api.models.Cart import Cart, CartItem
from libs.core.utils.api.serializers.AddressSerializer import AddressSerializer
from webdjango.serializers.MongoSerializer import EmbeddedSerializer, ArrayModelFieldSerializer


class CartItemSerializer(EmbeddedSerializer):

    product = ResourceRelatedField(
         many=False,
         queryset=Product.objects,
         required=True,
         related_link_url_kwarg='pk',
         self_link_view_name='product-relationships'
    )
    quantity = serializers.IntegerField(required=False)
    data = serializers.JSONField(required=False)

    class Meta:
        model = CartItem
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):

    # billing_address = AddressSerializer(required=False)
    # shipping_address = AddressSerializer(required=False)

    items = ArrayModelFieldSerializer(serializer=CartItemSerializer)

    class Meta:
        model = Cart
        fields = '__all__'
