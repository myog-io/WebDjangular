from webdjango.filters import WebDjangoFilterSet
from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework_json_api.views import ModelViewSet, RelationshipView
from webdjango.models.Core import Author, CoreConfig, Plugin, Theme, Website
from webdjango.serializers.CoreSerializer import AuthorSerializer, \
    CoreConfigSerializer, PluginSerializer, ThemeSerializer, \
    WebsiteSerializer

from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
from django.core.cache import cache

class CachedModelViewSet(ModelViewSet):
    
    def list(self, request, *args, **kwargs):
        @method_decorator(cache_page(7200, key_prefix=self.basename))
        @method_decorator(vary_on_cookie)
        def list_in(self, request, *args, **kwargs):
            return super(CachedModelViewSet, self).list(self, request, *args, **kwargs)
            
        return list_in(self, request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        
        @method_decorator(cache_page(7200, key_prefix=self.basename))
        @method_decorator(vary_on_cookie)
        def retrieve_in(self, request, *args, **kwargs):
            return super(CachedModelViewSet, self).retrieve(self, request, *args, **kwargs)
        
        return retrieve_in(self, request, *args, **kwargs)

class WebsiteFilter(WebDjangoFilterSet):
    class Meta:
        model = Website
        fields = {
            'id': ['in'],
            'domain': ['contains', 'exact'],
            'code': ['contains', 'exact'],
        }


class WebsiteViewSet(ModelViewSet):
    """
    ViewSet to view all Core Websites.
    """
    resource_name = 'core_website'
    queryset = Website.objects.all()
    serializer_class = WebsiteSerializer
    search_fields = ('domain', 'code')
    filter_class = WebsiteFilter


class CoreConfigFilter(WebDjangoFilterSet):
    class Meta:
        model = CoreConfig
        fields = {
            'id': ['in'],
            'website': ['exact'],
            'slug': ['contains', 'exact'],
        }


class CoreConfigViewSet(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    """
    ViewSet to view all Core Config.
    """
    lookup_field = 'slug'
    lookup_url_kwarg = 'slug'
    resource_name = 'core_config'
    queryset = CoreConfig.objects.all()
    serializer_class = CoreConfigSerializer
    search_fields = ('website', 'slug')
    filter_class = CoreConfigFilter

    def get_object(self):
        obj = CoreConfig.read(self.kwargs['slug'])
        self.check_object_permissions(self.request, obj)
        return obj


class AuthorFilter(WebDjangoFilterSet):
    class Meta:
        model = Author
        fields = {
            'id': ['in'],
            'name': ['contains', 'exact'],
            'email': ['contains', 'exact'],
            'website': ['contains', 'exact'],
        }


class AuthorViewSet(ModelViewSet):
    """
    ViewSet to view all Authors.
    """
    resource_name = 'core_author'
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    search_fields = ('name', 'email', 'website')
    filter_class = AuthorFilter


class PluginFilter(WebDjangoFilterSet):
    class Meta:
        model = Plugin
        fields = {
            'id': ['in'],
            'name': ['contains', 'exact'],
            'slug': ['contains', 'exact'],
        }


class PluginViewSet(ModelViewSet):
    """
    ViewSet to view all Apps.
    """
    resource_name = 'core_plugin'
    queryset = Plugin.objects.all()
    serializer_class = PluginSerializer
    search_fields = ('name', 'slug')
    filter_class = PluginFilter

    """
    List a queryset.
    """

    def list(self, request, *args, **kwargs):
        # Adding the Script to update all the Themes, before listing it!
        Plugin.update_list()
        return super(PluginViewSet, self).list(request, args, **kwargs)


class ThemeFilter(WebDjangoFilterSet):
    class Meta:
        model = Theme
        fields = {
            'id': ['in'],
            'name': ['contains', 'exact'],
            'slug': ['contains', 'exact'],
        }


class ThemeViewSet(ModelViewSet):
    """
    ViewSet to view all Themes.
    """
    resource_name = 'core_theme'
    queryset = Theme.objects.all()
    serializer_class = ThemeSerializer
    search_fields = ('name', 'slug')
    filter_class = ThemeFilter

    """
    List a queryset.
    """

    def list(self, request, *args, **kwargs):
        # Adding the Script to update all the Themes, before listing it!
        Theme.update_list()
        return super(ThemeViewSet, self).list(request, args, **kwargs)
