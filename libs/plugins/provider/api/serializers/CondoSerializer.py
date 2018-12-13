from ..models.Condo import Condo
from ..models.City import City
from libs.plugins.store.api.models.Product import Product
from rest_framework_json_api.relations import ResourceRelatedField
from webdjango.serializers.MongoSerializer import DocumentSerializer


class CondoSerializer(DocumentSerializer):
    included_serializers = {
        'products': 'libs.plugins.store.api.serializers.ProductSerializer.ProductSerializer',
        'city' : 'libs.plugins.provider.api.serializers.CitySerializer.CitySerializer',
    }
    products = ResourceRelatedField(
        many=True,
        queryset=Product.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='channel-relationships'
    )
    city = ResourceRelatedField(
        many=False,
        queryset=City.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='page-redirect-relationships'
    )
    class Meta:
        fields = '__all__'
        model = Condo
