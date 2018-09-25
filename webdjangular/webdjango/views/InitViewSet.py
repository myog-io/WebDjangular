from rest_framework import authentication, permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from webdjangular.core.cms.models.Page import Page
from webdjangular.core.cms.serializers.PageSerializer import PageSerializer
from webdjangular.webdjango.configs import CONFIG_HOME_PAGE
from webdjangular.webdjango.models.Core import CoreConfig, Plugin, Theme, Website
from webdjangular.webdjango.serializers.CoreSerializer import PluginSerializer, ThemeSerializer


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
        pluginsSerializer = PluginSerializer(
            Plugin.objects.filter(active=True),
            many=True
        )

        themeSerializer = ThemeSerializer(
            Theme.objects.filter(active=True).first(),
            many=False
        )

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

        response = {
            "active": True,
            "locale_list": [
                "pt-br",
                "en-us"
            ],
            'locale_active': 'pt-br',
            'plugins': pluginsSerializer.data,
            'theme': themeSerializer.data,
        }
        return Response(response)
