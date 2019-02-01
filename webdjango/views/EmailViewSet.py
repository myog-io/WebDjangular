from django_filters.rest_framework.backends import DjangoFilterBackend
from rest_framework import serializers
from rest_framework.filters import SearchFilter
from rest_framework_json_api.views import ModelViewSet
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from webdjango.filters import WebDjangoFilterSet
from ..models.Email import Email
from ..serializers.EmailSerializer import EmailSerializer
from ..utils.permissions.AuthenticatedViewsetPermission import \
    AuthenticatedViewsetPermission


class EmailFilter(WebDjangoFilterSet):
    class Meta:
        model = Email
        fields = ('id', 'subject', 'code', 'content')


class EmailViewSet(ModelViewSet):
    """
    ViewSet to view all Core Websites.
    """
    queryset = Email.objects.all()
    serializer_class = EmailSerializer
    authentication_classes = (JSONWebTokenAuthentication,)
    filter_backends = (SearchFilter, DjangoFilterBackend)
    search_fields = ('domain', 'code')
    filter_class = EmailFilter
    permission_classes = (AuthenticatedViewsetPermission,)
