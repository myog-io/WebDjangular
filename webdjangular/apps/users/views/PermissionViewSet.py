from django.contrib.auth.models import Permission

from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework.viewsets import GenericViewSet

from webdjangular.apps.users.serializers.PermissionSerializer import PermissionSerializer




class PermissionViewSet(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    resource_name = 'permission';
    serializer_class = PermissionSerializer
    queryset = Permission.objects.all()
    authentication_classes = (JSONWebTokenAuthentication,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', )

