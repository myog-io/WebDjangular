from django_filters.filterset import FilterSet
from django_filters.rest_framework import filters
from django_filters.rest_framework.backends import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from webdjango.models.CoreConfig import CoreConfigGroup, CoreConfigInput
from webdjango.models.Core import CoreConfig
from webdjango.serializers.CoreConfigSerializer import CoreConfigGroupSerializer, CoreConfigInputSerializer
from webdjango.utils.permissions.AuthenticatedViewsetPermission import AuthenticatedViewsetPermission

import json


class CoreConfigGroupViewSet(viewsets.GenericViewSet):
    """
    Handles:
    Creating an User - Sign Up
    Retrieve a list of users
    Retrieve a specific User
    Update an User
    """
    base_name = 'core_config_group'
    resource_name = 'core_config_group'
    authentication_classes = (JSONWebTokenAuthentication,)
    serializer_class = CoreConfigGroupSerializer
    # There's no problem in this permission be AllowAny, because it's only reading some basic information on how to generate the Form
    permission_classes = (AllowAny, )
    def get_queryset(self):
        return CoreConfigGroup.all()

    def get_object(self):
        obj = CoreConfigGroup.get(self.kwargs['pk'])

        return obj

    """
    List a queryset.
    """
    def list(self, request, format=None):
        groups = CoreConfigGroup.all()
        serializer = self.serializer_class(groups, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk, *args, **kwargs):
        group = CoreConfigGroup.get(pk)
        serializer = self.serializer_class(group, many=False)
        return Response(serializer.data)

    """
    This Update it's actually to update The Core Config Values of a Group
    """
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        CoreConfig.write(serializer.data['id'],request.data['value'])


        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

class CoreConfigInputViewSet(viewsets.GenericViewSet):
    """
    Handles:
    Creating an User - Sign Up
    Retrieve a list of users
    Retrieve a specific User
    Update an User
    """
    base_name = 'core_config_input'
    resource_name = 'core_config_input'
    authentication_classes = (JSONWebTokenAuthentication,)
    serializer_class = CoreConfigInputSerializer
    # There's no problem in this permission be AllowAny, because it's only reading some basic information on how to generate the Form
    permission_classes = (AllowAny, )
    def get_queryset(self):
        return CoreConfigInput.all()
    """
    List a queryset.
    """
    def list(self, request, format=None):
        '''
        Listing All Core Config Input View Set
        You can filter via `group` param
        '''
        inputs = CoreConfigInput.all()
        if request.GET.get('group'):
            group = request.GET.get('group')
            inputs = list(filter(lambda obj: obj.group == group, inputs))
        serializer = self.serializer_class(inputs, many=True)
        return Response(serializer.data)



