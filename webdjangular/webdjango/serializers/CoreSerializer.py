from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import ValidationError

from webdjangular.webdjango.models.Core import Author, Theme, App


class AuthorSerializer(ModelSerializer):
    """
    The serializer for Authors
    """
    class Meta:
        model = Author


class AppSerializer(ModelSerializer):
    """
    The serializer for Themes
    """
    class Meta:
        model = App


class ThemeSerializer(ModelSerializer):
    """
    The serializer for Apps
    """
    class Meta:
        model = Theme
