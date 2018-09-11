from django.contrib.auth.models import Group

from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from webdjangular.apps.users.permissions.UpdateOwnUser import UpdateOwnUser
from webdjangular.apps.users.serializers.GroupSerializer import GroupSerializer





class GroupViewSet(CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, GenericViewSet):
    resource_name = 'group';
    serializer_class = GroupSerializer
    queryset = Group.objects.all()
    authentication_classes = (JSONWebTokenAuthentication,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', )
