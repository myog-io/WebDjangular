from rest_framework import permissions, viewsets
from rest_framework.response import Response

from libs.core.cms.api.models.Page import Page
from libs.core.cms.api.serializers.PageSerializer import PageSerializer
from webdjango.models.Core import Plugin, Theme, CoreConfig
from webdjango.serializers.CoreSerializer import PluginSerializer, ThemeSerializer, CoreConfigSerializer
from webdjango.models.CoreConfig import CoreConfigGroup


class InitViewSet(viewsets.GenericViewSet):
    """
    INIT WebDjangular Application.
    Retrieve all essentials data in order to launch the application
    """
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    permission_classes = (permissions.AllowAny,)

    def list(self, request, format=None):
        """
        Return the essential data.
        """
        plugins = Plugin.objects.filter(active=True)
        pluginsSerializer = None
        if plugins:
            pluginsSerializer = PluginSerializer(
                plugins,
                many=True
            )
            pluginsSerializer.is_valid()
        theme = Theme.objects.filter(active=True).first()
        themeSerializer = None
        if theme:
            themeSerializer = ThemeSerializer(
                theme,
                many=False
            )
            themeSerializer.is_valid()
        # TODO: retrieve locale(s)
        """
        if there is more than 1 locale, get the locale based on localization
        """

        # TODO: load cache if exists

        # TODO: define current User Object
        """
        Current User Object is whether a guest, admin or any other role
        in order to manage the user's requests according to its permissions.
        """
        config_groups = CoreConfigGroup.all()
        config_keys = []
        if config_groups:
            for group in config_groups:
                config_keys.append(group.pk)
        configs = CoreConfig.objects.filter(
            website=request.website, slug__in=config_keys)

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
            'core_config': core_config_data
        }
        if pluginsSerializer:
            response['plugins'] = pluginsSerializer.data
        if themeSerializer:
            response['theme'] = themeSerializer.data
        return Response(response)
