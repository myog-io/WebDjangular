from ..models.Channel import Channel
from libs.plugins.store.api.models.Product import Product
from rest_framework import serializers
from rest_framework_json_api.relations import ResourceRelatedField
from webdjango.serializers.MongoSerializer import DocumentSerializer


class ChannelSerializer(DocumentSerializer):
    included_serializers = {
        'products': 'libs.plugins.store.api.serializers.ProductSerializer.ProductSerializer',

    }
    products = ResourceRelatedField(
        many=True,
        queryset=Product.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='channel-relationships'
    )
    groups = serializers.ListSerializer(child=serializers.CharField())
    types = serializers.ListSerializer(child=serializers.CharField())
    class Meta:
        fields = '__all__'
        model = Channel
