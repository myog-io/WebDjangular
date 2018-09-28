from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import ValidationError

from webdjango.models.Core import Author, Theme, Plugin, CoreConfig, Website


class WebsiteSerializer(ModelSerializer):
    """
    The serializer for Websites
    """
    class Meta:
        model = Website
        fields = '__all__'


class CoreConfigSerializer(ModelSerializer):
    """
    The serializer for CoreConfigs
    """
    class Meta:
        model = CoreConfig
        fields = '__all__'

class AuthorSerializer(ModelSerializer):
    """
    The serializer for Authors
    """
    class Meta:
        model = Author
        fields = '__all__'


class PluginSerializer(ModelSerializer):
    """
    The serializer for Plugins
    """
    class Meta:
        model = Plugin
        fields = '__all__'


class ThemeSerializer(ModelSerializer):
    """
    The serializer for Themes
    """
    class Meta:
        model = Theme
        fields = '__all__'
