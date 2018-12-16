from django.contrib.auth.models import Permission
from django_filters.rest_framework.backends import DjangoFilterBackend
from libs.core.users.api.serializers.PermissionSerializer import PermissionSerializer
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.mixins import CreateModelMixin, DestroyModelMixin, \
    ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework_jwt.authentication import JSONWebTokenAuthentication


class PermissionViewSet(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    resource_name = 'permission';
    serializer_class = PermissionSerializer
    queryset = Permission.objects.all()
    authentication_classes = (JSONWebTokenAuthentication,)
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    search_fields = ('name', )

    '''
        For some reason the Permission queryset needs the list()
        in the return in order to the pagination work.
        That is happening only with the permission viewset model.

    '''
    def get_queryset(self):
        if 'pk' in self.kwargs:
            return super(PermissionViewSet, self).get_queryset();
        else:
            return list(super(PermissionViewSet, self).get_queryset());
