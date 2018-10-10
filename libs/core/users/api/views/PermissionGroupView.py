from django.contrib.auth.models import Permission

from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.mixins import ListModelMixin

from rest_framework.viewsets import GenericViewSet

from libs.core.users.api.serializers.PermissionSerializer import PermissionSerializer


class PermissionGroupView(ListModelMixin, GenericViewSet):
    serializer_class = PermissionSerializer
    queryset = Permission.objects.all()
    authentication_classes = (JSONWebTokenAuthentication,)
    filter_backends = (filters.SearchFilter,)

    def get_queryset(self):
        queryset = super(PermissionGroupView, self).get_queryset()
        if 'group_pk' in self.kwargs:
            group_pk = self.kwargs['group_pk']
            queryset = queryset.filter(group__pk=group_pk)
        return queryset
