from rest_framework import serializers
from rest_framework_json_api.relations import ResourceRelatedField

from libs.plugins.store.api.models.Product import Product
from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer
from ..models.Channel import Channel


class ChannelSerializer(WebDjangoSerializer):
    included_serializers = {
        'products': 'libs.plugins.store.api.serializers.ProductSerializer.ProductSerializer',

    }
    products = ResourceRelatedField(
        many=True,
        queryset=Product.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='channel-relationships',
        required=False, allow_null=True,
    )
    groups = serializers.JSONField(required=False, allow_null=True)
    types = serializers.JSONField(required=False, allow_null=True)

    class Meta:
        fields = '__all__'
        model = Channel
