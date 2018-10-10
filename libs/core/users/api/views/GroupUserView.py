from django.contrib.auth.models import Group

from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED
from rest_framework.status import HTTP_204_NO_CONTENT
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import detail_route, list_route

from libs.core.users.api.permissions.UpdateOwnUser import UpdateOwnUser
from libs.core.users.api.serializers.GroupSerializer import GroupSerializer


class GroupUserView(ListModelMixin, GenericViewSet):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()
    authentication_classes = (JSONWebTokenAuthentication,)
    filter_backends = (filters.SearchFilter,)

    def get_queryset(self):
        queryset = super(GroupUserView, self).get_queryset()
        if 'user_pk' in self.kwargs:
            user_pk = self.kwargs['user_pk']
            queryset = queryset.filter(user__pk=user_pk)
        return queryset
