from django.core import serializers
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from libs.core.cms.api.models.Page import Page
from libs.core.cms.api.serializers.PageSerializer import PageSerializer
from webdjango.models.Core import CoreConfig, Plugin, Theme
from webdjango.models.CoreConfig import CoreConfigGroup
from webdjango.serializers.CoreSerializer import (PluginSerializer,
                                                  ThemeSerializer)


class InitViewSet(viewsets.GenericViewSet):
    """
    INIT WebDjangular Application.
    Retrieve all essentials data in order to launch the application
    """
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    public_views = ('list', )
    #permission_classes = (IsAuthenticatedOrReadOnly, )

    def list(self, request, format=None):
        """
        Return the essential data.
        """
        plugins = Plugin.objects.filter(active=True)
        plugins_serializer = None
        if plugins:
            plugins_serializer = PluginSerializer(
                plugins,
                many=True
            )
            plugins_serializer.is_valid()
        theme = Theme.objects.filter(active=True).first()
        theme_serializer = None
        if theme:
            theme_serializer = ThemeSerializer(
                theme,
                many=False
            )
            theme_serializer.is_valid()
        # TODO: retrieve locale(s)
        # if there is more than 1 locale, get the locale based on localization

        # TODO: define current User Object
        # Current User Object is whether a guest, admin or any other role
        # in order to manage the user's requests according to its permissions.

        configs = CoreConfig.objects.filter(
            secure=False,
            website=request.website
        )

        core_config_data = {}
        if configs:
            for config in configs:
                core_config_data[config.slug] = config.value
        response = {
            "active": True,
            "locale_list": [
                "pt-br",
                "en-us"
            ],
            'locale_active': 'pt-br',
            'plugins': [],
            'theme': None,
            'core_config': core_config_data,
            "website": {
                "domain": request.website.domain,
                "protocol": request.website.protocol
            }
        }
        if plugins_serializer:
            response['plugins'] = plugins_serializer.data
        if theme_serializer:
            response['theme'] = theme_serializer.data
        return Response(response)
