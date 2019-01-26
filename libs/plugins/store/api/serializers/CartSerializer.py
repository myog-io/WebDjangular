from rest_framework_json_api import serializers
from rest_framework_json_api.relations import ResourceRelatedField

from libs.plugins.store.api.models.Cart import Cart, CartItem
from libs.plugins.store.api.models.Product import Product
from webdjango.models.Address import Address
from libs.core.users.api.models.User import User
from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer


class CartItemSerializer(WebDjangoSerializer):
    cart = ResourceRelatedField(
        many=False,
        queryset=Cart.objects,
        required=True,
        related_link_url_kwarg='pk',
        self_link_view_name='cart-item-relationships',
        related_link_view_name='cart-item-related',

    )
    product = ResourceRelatedField(
        many=False,
        queryset=Product.objects,
        required=True,
        related_link_url_kwarg='pk',
        self_link_view_name='cart-item-relationships',
        related_link_view_name='cart-item-related',
    )
    quantity = serializers.IntegerField(required=False)
    data = serializers.JSONField(required=False)

    included_serializers = {
        'product': 'libs.plugins.store.api.serializers.ProductSerializer.ProductSerializer',
        'cart': 'libs.plugins.store.api.serializers.CartSerializer.CartSerializer',
    }

    class Meta:
        model = CartItem
        fields = '__all__'


class CartSerializer(WebDjangoSerializer):
    items = ResourceRelatedField(
        many=True,
        queryset=CartItem.objects,
        required=False,
        related_link_url_kwarg='pk',
        self_link_view_name='cart-relationships'
    )

    billing_address = ResourceRelatedField(
        many=False,
        queryset=Address.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='cart-relationships',
        related_link_view_name='cart-related',
        required=False
    )

    shipping_address = ResourceRelatedField(
        many=False,
        queryset=Address.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='cart-relationships',
        related_link_view_name='cart-related',
        required=False
    )
    user = ResourceRelatedField(
        many=False,
        queryset=User.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='cart-relationships',
        related_link_view_name='cart-related',
        required=False
    )
    extra_data = serializers.JSONField(required=False)

    included_serializers = {
        'shipping_address': 'webdjango.serializers.AddressSerializer.AddressSerializer',
        'billing_address': 'webdjango.serializers.AddressSerializer.AddressSerializer',
        'items': 'libs.plugins.store.api.serializers.CartSerializer.CartItemSerializer',
        'user': 'libs.core.users.api.serializers.UserSerializer.UserSerializer',
    }

    class Meta:
        model = Cart
        fields = '__all__'
