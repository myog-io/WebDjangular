from django_filters.filterset import FilterSet
from django_filters.rest_framework import filters
from django_filters.rest_framework.backends import DjangoFilterBackend
from rest_framework.mixins import ListModelMixin
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from webdjango.models.CoreConfig import CoreConfigGroup, CoreConfigInput
from webdjango.utils.permissions.AuthenticatedViewsetPermission import AuthenticatedViewsetPermission

class CoreConfigGroupViewSet(APIView):
    """
    Handles:
    Creating an User - Sign Up
    Retrieve a list of users
    Retrieve a specific User
    Update an User
    """
    resource_name = 'core_config_group'
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (AuthenticatedViewsetPermission, )
    """
    List a queryset.
    """
    def get(self, request, format=None):
        print(CoreConfigGroup.all())
        return Response(CoreConfigGroup.all())

class CoreConfigInputViewSet(APIView):
    """
    Handles:
    Creating an User - Sign Up
    Retrieve a list of users
    Retrieve a specific User
    Update an User
    """
    resource_name = 'core_config_input'
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (AuthenticatedViewsetPermission, )
    """
    List a queryset.
    """
    def get(self, request, format=None):
        return Response(CoreConfigInput.all());

