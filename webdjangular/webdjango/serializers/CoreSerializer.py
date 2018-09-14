from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import ValidationError

from webdjangular.webdjango.models.Core import Author, Theme, App


class AuthorSerializer(ModelSerializer):
    """
    The serializer for Authors
    """
    class Meta:
        model = Author
        fields = '__all__'


class AppSerializer(ModelSerializer):
    """
    The serializer for Themes
    """
    class Meta:
        model = App
        fields = '__all__'


class ThemeSerializer(ModelSerializer):
    """
    The serializer for Apps
    """
    class Meta:
        model = Theme
        fields = '__all__'
