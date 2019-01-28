from rest_framework_json_api import serializers
from rest_framework_json_api.relations import ResourceRelatedField

from libs.plugins.store.api.models.Cart import Cart, CartItem, CartTerm
from libs.plugins.store.api.models.Product import Product
from webdjango.models.Address import Address
from libs.core.users.api.models.User import User
from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer
from libs.plugins.store.api import defaults
from .MoneySerializer import MoneyField

class CartTermSerializer(WebDjangoSerializer):
    products = ResourceRelatedField(
        many=True,
        queryset=Product.objects,
        required=False,
        related_link_url_kwarg='pk',
        self_link_view_name='cart-term-relationships',
        related_link_view_name='cart-term-related',
    )
    included_serializers = {
        'products': 'libs.plugins.store.api.serializers.ProductSerializer.ProductSerializer',
    }
    class Meta:
        model = CartTerm
        fields = '__all__'


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
        required=False,
        related_link_url_kwarg='pk',
        self_link_view_name='cart-item-relationships',
        related_link_view_name='cart-item-related',
    )
    quantity = serializers.IntegerField(required=False)
    data = serializers.JSONField(required=False)
    base_price = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                              decimal_places=defaults.DEFAULT_DECIMAL_PLACES,read_only=True)
    price = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                              decimal_places=defaults.DEFAULT_DECIMAL_PLACES,read_only=True)
    discount = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                              decimal_places=defaults.DEFAULT_DECIMAL_PLACES,read_only=True)
    total = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                              decimal_places=defaults.DEFAULT_DECIMAL_PLACES,read_only=True)
    
    is_shipping_required = serializers.BooleanField(read_only=True)
    name = serializers.CharField(read_only=True)
    sku = serializers.CharField(read_only=True)
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

    terms = ResourceRelatedField(
        many=False,
        queryset=CartTerm.objects,
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
        'terms': 'libs.plugins.store.api.serializers.CartSerializer.CartTermSerializer',
        'user': 'libs.core.users.api.serializers.UserSerializer.UserSerializer',
    }
    is_shipping_required = serializers.BooleanField(read_only=True)
    shipping_price = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                              decimal_places=defaults.DEFAULT_DECIMAL_PLACES,read_only=True)
    taxes = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                              decimal_places=defaults.DEFAULT_DECIMAL_PLACES,read_only=True)
    fees = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                              decimal_places=defaults.DEFAULT_DECIMAL_PLACES,read_only=True)
    subtotal = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                              decimal_places=defaults.DEFAULT_DECIMAL_PLACES,read_only=True)
    total = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                              decimal_places=defaults.DEFAULT_DECIMAL_PLACES,read_only=True)

    class Meta:
        model = Cart
        fields = '__all__'
