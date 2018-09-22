from rest_framework.filters import SearchFilter
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from webdjangular.webdjango.models.Core import Plugin, Author, CoreConfig, Theme, \
    Website
from webdjangular.webdjango.serializers.CoreSerializer import PluginSerializer, \
    AuthorSerializer, CoreConfigSerializer, ThemeSerializer, \
    WebsiteSerializer

from webdjangular.webdjango.utils.permissions.AuthenticatedViewsetPermission import AuthenticatedViewsetPermission

class WebsiteViewSet(ModelViewSet):
    """
    ViewSet to view all Core Websites.
    """
    resource_name = 'core_website'
    queryset = Website.objects.all()
    serializer_class = WebsiteSerializer
    authentication_classes = (JSONWebTokenAuthentication,)
    filter_backends = (SearchFilter,)
    search_fields = ('domain', 'code')
    permission_classes = (AuthenticatedViewsetPermission,)

class CoreConfigViewSet(ModelViewSet):
    """
    ViewSet to view all Core Config.
    """
    resource_name = 'core_config'
    queryset = CoreConfig.objects.all()
    serializer_class = CoreConfigSerializer
    authentication_classes = (JSONWebTokenAuthentication,)
    filter_backends = (SearchFilter,)
    search_fields = ('website', 'slug')
    permission_classes = (AuthenticatedViewsetPermission,)
    

class AuthorViewSet(ModelViewSet):
    """
    ViewSet to view all Authors.
    """
    resource_name = 'core_author'
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    authentication_classes = (JSONWebTokenAuthentication,)
    filter_backends = (SearchFilter,)
    search_fields = ('name', 'email', 'website')
    permission_classes = (AuthenticatedViewsetPermission,)
   

class PluginViewSet(ModelViewSet):
    """
    ViewSet to view all Apps.
    """
    resource_name = 'core_plugin'
    queryset = Plugin.objects.all()
    serializer_class = PluginSerializer
    authentication_classes = (JSONWebTokenAuthentication,)
    filter_backends = (SearchFilter,)
    search_fields = ('name', 'slug')
    permission_classes = (AuthenticatedViewsetPermission,)
    """
    List a queryset.
    """
    def list(self, request, *args, **kwargs):
        ## Adding the Script to update all the Themes, before listing it!
        Plugin.update_list()
        return super(PluginViewSet, self).list(request, args, **kwargs)

class ThemeViewSet(ModelViewSet):
    """
    ViewSet to view all Themes.
    """
    resource_name = 'core_theme'
    queryset = Theme.objects.all()
    serializer_class = ThemeSerializer
    authentication_classes = (JSONWebTokenAuthentication,)
    filter_backends = (SearchFilter,)
    search_fields = ('name', 'slug')
    permission_classes = (AuthenticatedViewsetPermission,)

    """
    List a queryset.
    """
    def list(self, request, *args, **kwargs):
        ## Adding the Script to update all the Themes, before listing it!
        Theme.update_list()
        return super(ThemeViewSet, self).list(request, args, **kwargs)
