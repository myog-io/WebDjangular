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

    @action(methods=['GET'], detail=False, url_path='get_home')
    def get_home(self, request, format=None):
        """
        Return the Home Page
        """
        serializer = PageSerializer(
            Page.objects.get(
                pk=CoreConfig.read(slug=CONFIG_HOME_PAGE,
                                   website=request.website)
            )
        )
        # TODO: Get the Plugin Name Related to the Page
        response = {
            "data": serializer.data,
            "plugin": "PLUGIN_NAME",
        }
        return Response(response)

    @action(methods=['POST'], detail=False, url_path='get_content')
    def get_content(self, request, format=None):
        """
        Return Content for Other Pages based on slug
        """
        print("HERE?????")
        # First let's get the page based on the data sent
        print(request.data)
        serializer = PageSerializer(
            Page.objects.get(
                slug='/'.join(request.data.path)  # Gluing Path Toguether
            ).first()
        )
        if serializer:
            # TODO: Get the Plugin Name Related to the Page
            response = {
                "data": serializer.data,
                "plugin": "PLUGIN_NAME",
            }
            return Response(response)

        # If we dont find the page we return 404
        response = {
            "data": "NOT WORKING",
            "message": "Not Found"
        }
        return Response(response, status=404)

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
