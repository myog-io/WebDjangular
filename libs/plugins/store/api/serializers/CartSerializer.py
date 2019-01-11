
from rest_framework_json_api import serializers
from rest_framework_json_api.relations import ResourceRelatedField

from libs.core.cms.api.models.Block import Block
from libs.plugins.store.api.models.Product import Product
from libs.plugins.store.api.models.Cart import Cart, CartItem
from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer


class CartItemSerializer(WebDjangoSerializer):

    product = ResourceRelatedField(
         many=False,
         queryset=Product.objects,
         required=True,
         related_link_url_kwarg='pk',
         self_link_view_name='cart-item-relationships'
    )
    quantity = serializers.IntegerField(required=False)
    data = serializers.JSONField(required=False)

    class Meta:
        model = CartItem
        fields = '__all__'


class CartSerializer(WebDjangoSerializer):


    items = ResourceRelatedField(
         many=False,
         queryset=CartItem.objects,
         required=True,
         related_link_url_kwarg='pk',
         self_link_view_name='cart-relationships'
    )

    class Meta:
        model = Cart
        fields = '__all__'
