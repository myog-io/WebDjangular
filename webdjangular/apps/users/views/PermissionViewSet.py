from django.contrib.auth.models import Permission

from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED
from rest_framework.status import HTTP_204_NO_CONTENT
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.viewsets import GenericViewSet

from ..serializers.PermissionSerializer import PermissionSerializer




class PermissionViewSet(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    """
    Handles:
    Creating an User - Sign Up
    Retrieve a list of users
    Retrieve a specific User
    Update an User
    """
    resource_name = 'permission';
    serializer_class = PermissionSerializer
    queryset = Permission.objects.all()
    authentication_classes = (JSONWebTokenAuthentication,)
    filter_backends = (filters.SearchFilter,)

