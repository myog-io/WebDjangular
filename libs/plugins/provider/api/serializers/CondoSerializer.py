from ..models.Condo import Condo
from ..models.City import City
from libs.plugins.store.api.models.Product import Product
from rest_framework_json_api.relations import ResourceRelatedField
from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer


class CondoSerializer(WebDjangoSerializer):
    included_serializers = {
        'products': 'libs.plugins.store.api.serializers.ProductSerializer.ProductSerializer',
        'city' : 'libs.plugins.provider.api.serializers.CitySerializer.CitySerializer',
    }
    products = ResourceRelatedField(
        many=True,
        queryset=Product.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='condo-relationships',
        required=False, allow_null=True,
    )
    city = ResourceRelatedField(
        many=False,
        queryset=City.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='condo-relationships'
    )
    class Meta:
        fields = '__all__'
        model = Condo
