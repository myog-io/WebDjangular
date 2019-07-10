from rest_framework import serializers
from rest_framework_json_api.relations import ResourceRelatedField

from libs.plugins.store.api.models.Order import Order
from libs.plugins.store.api.models.Product import Product
from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer

from ..models.Reseller import Reseller


class ResellerSerializer(WebDjangoSerializer):
    included_serializers = {
        'orders': 'libs.plugins.store.api.serializers.OrderSerializer.OrderSerializer',
    }
    orders = ResourceRelatedField(
        many=True,
        queryset=Order.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='reseller-relationships',
        required=False, allow_null=True,
    )
    order_count = serializers.IntegerField(read_only=True)

    class Meta:
        fields = '__all__'
        model = Reseller
