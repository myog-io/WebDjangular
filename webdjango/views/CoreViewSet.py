from django_filters.filterset import FilterSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from webdjango.models.Core import Author, CoreConfig, Plugin, Theme, Website
from webdjango.serializers.CoreSerializer import AuthorSerializer, \
    CoreConfigSerializer, PluginSerializer, ThemeSerializer, \
    WebsiteSerializer
from webdjango.utils.permissions.AuthenticatedViewsetPermission import AuthenticatedViewsetPermission


class WebsiteFilter(FilterSet):
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
    authentication_classes = (JSONWebTokenAuthentication,)
    filter_backends = (SearchFilter, DjangoFilterBackend)
    search_fields = ('domain', 'code')
    filter_class = WebsiteFilter
    permission_classes = (AuthenticatedViewsetPermission,)


class CoreConfigFilter(FilterSet):
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
    authentication_classes = (JSONWebTokenAuthentication,)
    filter_backends = (SearchFilter, DjangoFilterBackend)
    search_fields = ('website', 'slug')
    filter_class = CoreConfigFilter
    permission_classes = (AuthenticatedViewsetPermission,)

    def get_object(self):
        obj = CoreConfig.read(self.kwargs['slug'])
        self.check_object_permissions(self.request, obj)
        return obj


class AuthorFilter(FilterSet):
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
    authentication_classes = (JSONWebTokenAuthentication,)
    filter_backends = (SearchFilter, DjangoFilterBackend)
    search_fields = ('name', 'email', 'website')
    permission_classes = (AuthenticatedViewsetPermission,)
    filter_class = AuthorFilter


class PluginFilter(FilterSet):
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
    authentication_classes = (JSONWebTokenAuthentication,)
    filter_backends = (SearchFilter, DjangoFilterBackend)
    search_fields = ('name', 'slug')
    permission_classes = (AuthenticatedViewsetPermission,)
    filter_class = PluginFilter
    """
    List a queryset.
    """

    def list(self, request, *args, **kwargs):
        # Adding the Script to update all the Themes, before listing it!
        Plugin.update_list()
        return super(PluginViewSet, self).list(request, args, **kwargs)


class ThemeFilter(FilterSet):
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
    authentication_classes = (JSONWebTokenAuthentication,)
    filter_backends = (SearchFilter, DjangoFilterBackend)
    search_fields = ('name', 'slug')
    permission_classes = (AuthenticatedViewsetPermission,)
    filter_class = ThemeFilter

    """
    List a queryset.
    """
    def list(self, request, *args, **kwargs):
        # Adding the Script to update all the Themes, before listing it!
        Theme.update_list()
        return super(ThemeViewSet, self).list(request, args, **kwargs)
