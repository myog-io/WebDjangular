from rest_framework_json_api import serializers

from libs.core.utils.api.models.Address import Address
from webdjango.serializers.MongoSerializer import EmbeddedSerializer


class AddressSerializer(EmbeddedSerializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    company_name = serializers.CharField()
    street_address_1 = serializers.CharField()
    street_address_2 = serializers.CharField()
    city = serializers.CharField()
    state = serializers.CharField()
    postal_code = serializers.CharField()
    country = serializers.CharField()
    country_area = serializers.CharField()
    phone = serializers.CharField()

    class Meta:
        model = Address
        fields = '__all__'
