from django.contrib.auth.models import Group
from rest_framework.mixins import (CreateModelMixin, DestroyModelMixin,
                                   ListModelMixin, RetrieveModelMixin,
                                   UpdateModelMixin)
from rest_framework.viewsets import GenericViewSet

from libs.core.users.api.serializers.GroupSerializer import GroupSerializer


class GroupViewSet(CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, GenericViewSet):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()
    ordering_fields = '__all__'
    search_fields = ('name', )
