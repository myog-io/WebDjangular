from django.contrib.auth.models import Group
from django_filters.rest_framework.backends import DjangoFilterBackend
from libs.core.users.api.permissions.UpdateOwnUser import UpdateOwnUser
from libs.core.users.api.serializers.GroupSerializer import GroupSerializer
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action, detail_route, list_route
from rest_framework.mixins import CreateModelMixin, ListModelMixin, \
    RetrieveModelMixin, UpdateModelMixin
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, \
    HTTP_400_BAD_REQUEST
from rest_framework.viewsets import GenericViewSet
from rest_framework_jwt.authentication import JSONWebTokenAuthentication


class GroupUserView(ListModelMixin, GenericViewSet):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()
    authentication_classes = (JSONWebTokenAuthentication,)
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'

    def get_queryset(self):
        queryset = super(GroupUserView, self).get_queryset()
        if 'user_pk' in self.kwargs:
            user_pk = self.kwargs['user_pk']
            queryset = queryset.filter(user__pk=user_pk)
        return queryset
