from django.contrib.auth.models import Group
from rest_framework.mixins import ListModelMixin
from rest_framework.viewsets import GenericViewSet

from libs.core.users.api.serializers.GroupSerializer import GroupSerializer


class GroupUserView(ListModelMixin, GenericViewSet):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()
    ordering_fields = '__all__'

    def get_queryset(self):
        queryset = super(GroupUserView, self).get_queryset()
        if 'user_pk' in self.kwargs:
            user_pk = self.kwargs['user_pk']
            queryset = queryset.filter(user__pk=user_pk)
        return queryset
