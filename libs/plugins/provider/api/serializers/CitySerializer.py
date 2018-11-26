from rest_framework.serializers import ModelSerializer

from libs.plugins.provider.api.models.City import City


class CitySerializer(ModelSerializer):    
    class Meta:
        model = City
        fields = ('name', 'created', 'updated')
