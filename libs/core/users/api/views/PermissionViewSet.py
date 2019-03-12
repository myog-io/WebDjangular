from django.contrib.auth.models import Permission
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.viewsets import GenericViewSet

from libs.core.users.api.serializers.PermissionSerializer import \
    PermissionSerializer


class PermissionViewSet(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    serializer_class = PermissionSerializer
    queryset = Permission.objects.all()
    ordering_fields = '__all__'
    search_fields = ('name', )

    '''
        For some reason the Permission queryset needs the list()
        in the return in order to the pagination work.
        That is happening only with the permission viewset model.

    '''

    def get_queryset(self):
        if 'pk' in self.kwargs:
            return super(PermissionViewSet, self).get_queryset()
        else:
            return list(super(PermissionViewSet, self).get_queryset())
