from rest_framework.serializers import ValidationError
from webdjango.serializers.MongoSerializer import DocumentSerializer
from webdjango.models.Core import Author, Theme, Plugin, CoreConfig, Website


class WebsiteSerializer(DocumentSerializer):
    """
    The serializer for Websites
    """
    class Meta:
        model = Website
        fields = '__all__'


class CoreConfigSerializer(DocumentSerializer):
    """
    The serializer for CoreConfigs
    """
    class Meta:
        model = CoreConfig
        fields = '__all__'


class AuthorSerializer(DocumentSerializer):
    """
    The serializer for Authors
    """
    class Meta:
        model = Author
        fields = '__all__'


class PluginSerializer(DocumentSerializer):
    """
    The serializer for Plugins
    """
    class Meta:
        model = Plugin
        fields = '__all__'


class ThemeSerializer(DocumentSerializer):
    """
    The serializer for Themes
    """
    class Meta:
        model = Theme
        fields = '__all__'
