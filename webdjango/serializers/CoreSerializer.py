from rest_framework.serializers import ValidationError
from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer
from webdjango.models.Core import Author, Theme, Plugin, CoreConfig, Website


class WebsiteSerializer(WebDjangoSerializer):
    """
    The serializer for Websites
    """
    class Meta:
        model = Website
        fields = '__all__'


class CoreConfigSerializer(WebDjangoSerializer):
    """
    The serializer for CoreConfigs
    """
    class Meta:
        model = CoreConfig
        fields = '__all__'


class AuthorSerializer(WebDjangoSerializer):
    """
    The serializer for Authors
    """
    class Meta:
        model = Author
        fields = '__all__'


class PluginSerializer(WebDjangoSerializer):
    """
    The serializer for Plugins
    """
    class Meta:
        model = Plugin
        fields = '__all__'


class ThemeSerializer(WebDjangoSerializer):
    """
    The serializer for Themes
    """
    class Meta:
        model = Theme
        fields = '__all__'
