
from rest_framework_json_api import serializers

from libs.plugins.store.api.models.Cart import Cart, CartItem
from libs.core.utils.api.serializers.AddressSerializer import AddressSerializer
from webdjango.serializers.MongoSerializer import EmbeddedSerializer, ArrayModelFieldSerializer


class CartItemSerializer(EmbeddedSerializer):

    quantity = serializers.IntegerField()
    data = serializers.JSONField()

    class Meta:
        model = CartItem
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):

    billing_address = AddressSerializer()
    shipping_address = AddressSerializer()

    items = ArrayModelFieldSerializer(serializer=CartItemSerializer)

    class Meta:
        model = Cart
        fields = '__all__'
