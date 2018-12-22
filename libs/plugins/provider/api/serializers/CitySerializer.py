from ..models.City import City, Streets
from rest_framework_json_api import serializers
from rest_framework_json_api.relations import ResourceRelatedField
from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer


class StreetSerializer(WebDjangoSerializer):


    class Meta:
        fields = '__all__'
        model = Streets



class CitySerializer(WebDjangoSerializer):
    included_serializers = {
        'product_type': 'libs.plugins.store.api.serializers.ProductSerializer.ProductTypeSerializer',
        'addons': 'libs.plugins.store.api.serializers.ProductSerializer.ProductSerializer',
        'categories': 'libs.plugins.store.api.serializers.ProductSerializer.ProductCategorySerializer',
        'bundle_products': 'libs.plugins.store.api.serializers.ProductSerializer.ProductSerializer',
    }

    streets = ResourceRelatedField(
        many=True,
        queryset=Streets.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='city-relationships',
        related_link_view_name='city-related',
        required=False,
    )

    class Meta:
        model = City
        fields = '__all__'
