from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions




class InitAPIView(APIView):
    """
    INIT WebDjangular Application.
    Retrieve all essentials data in order to launch the application
    """

    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        """
        Return the essential data.
        """

        #TODO: retrieve plugin list

        #TODO: load active plugins

        #TODO: retrieve active theme

        #TODO: retrieve locale(s)
        """
        if there is more than 1 locale, get the locale based on localization 
        """

        #TODO: load cache if exists

        #TODO: define current User Object
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
            "plugins": [{
                "forms": {
                    "active": True,
                    "version": "1.0.0"
                }
            }],
            "theme": {
                "name": "pudim",
                "alias": "Pudim MyOG 2018",
                'module': 'PudimModule',
                "version": "1.2.0",
                "parent_theme": False
            }
        }
        return Response(response)