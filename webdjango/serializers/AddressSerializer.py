from rest_framework_json_api import serializers

from ..models.Address import Address
from .WebDjangoSerializer import WebDjangoSerializer


class AddressSerializer(WebDjangoSerializer):

    class Meta:
        model = Address
        fields = '__all__'
