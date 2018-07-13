from webdjangular.webdjango.models.Core import Author, App, Theme
from webdjangular.webdjango.serializers.CoreSerializer import AuthorSerializer, AppSerializer, ThemeSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response


class AuthorViewSet(ModelViewSet):
    """
    ViewSet to view all Authors.
    """
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
   

class AppViewSet(ModelViewSet):
    """
    ViewSet to view all Apps.
    """
    queryset = App.objects.all()
    serializer_class = AppSerializer


class ThemeViewSet(ModelViewSet):
    """
    ViewSet to view all Themes.
    """
    queryset = Theme.objects.all()
    serializer_class = ThemeSerializer
