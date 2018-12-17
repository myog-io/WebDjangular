from ..models.Reseller import Reseller
from libs.plugins.store.api.models.Product import Product
from rest_framework_json_api.relations import ResourceRelatedField
from webdjango.serializers.MongoSerializer import DocumentSerializer
from libs.plugins.store.api.models.Order import Order

class ResellerSerializer(DocumentSerializer):
    included_serializers = {
        'orders': 'libs.plugins.store.api.serializers.OrderSerializer.OrderSerializer',
    }
    orders = ResourceRelatedField(
        many=True,
        queryset=Order.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='channel-relationships',
        required=False, allow_null=True,
    )

    class Meta:
        fields = '__all__'
        model = Reseller
