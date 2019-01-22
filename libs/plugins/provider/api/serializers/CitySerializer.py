from rest_framework_json_api.relations import ResourceRelatedField

from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer
from ..models.City import City, Street, PostalCodeRange, NumberRange
from libs.plugins.store.api.models.Product import Product

class PostalCodeRangeSerializer(WebDjangoSerializer):
    included_serializers = {
        'city': 'libs.plugins.provider.api.serializers.CitySerializer.CitySerializer',
    }
    city = ResourceRelatedField(
        many=False,
        queryset=City.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='postal-code-range-relationships',
        related_link_view_name='postal-code-range-related',
    )

    class Meta:
        model = PostalCodeRange
        fields = '__all__'


class NumberRangeSerializer(WebDjangoSerializer):
    included_serializers = {
        'street': 'libs.plugins.provider.api.serializers.CitySerializer.StreetSerializer',
    }
    street = ResourceRelatedField(
        many=False,
        queryset=Street.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='number-range-relationships',
        related_link_view_name='number-range-related',
    )

    class Meta:
        model = NumberRange
        fields = '__all__'


class StreetSerializer(WebDjangoSerializer):
    included_serializers = {
        'numbers': 'libs.plugins.provider.api.serializers.CitySerializer.NumberRangeSerializer',
    }

    numbers = ResourceRelatedField(
        many=True,
        queryset=NumberRange.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='street-relationships',
        related_link_view_name='street-related',
        required=False
    )

    class Meta:
        model = Street
        fields = '__all__'


class CitySerializer(WebDjangoSerializer):
    included_serializers = {
        'streets': StreetSerializer,
        'postal_codes': PostalCodeRangeSerializer,
        'products': 'libs.plugins.store.api.serializers.ProductSerializer.ProductSerializer'
    }

    postal_codes = ResourceRelatedField(
        many=True,
        queryset=PostalCodeRange.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='city-relationships',
        related_link_view_name='city-related',
        required=False,
    )

    streets = ResourceRelatedField(
        many=True,
        queryset=Street.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='city-relationships',
        related_link_view_name='city-related',
        required=False,
    )

    products = ResourceRelatedField(
        many=True,
        queryset=Product.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='city-relationships',
        related_link_view_name='city-related',
        required=False,
    )
    class Meta:
        model = City
        fields = '__all__'
