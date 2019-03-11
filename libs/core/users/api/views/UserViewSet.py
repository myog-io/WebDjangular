from django.contrib.auth import get_user_model
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action, permission_classes, api_view
from rest_framework.exceptions import ValidationError
from rest_framework.mixins import CreateModelMixin, DestroyModelMixin, \
    ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, \
    HTTP_400_BAD_REQUEST
from rest_framework.viewsets import GenericViewSet
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from django_filters.rest_framework import DjangoFilterBackend
from webdjango.filters import WebDjangoFilterSet

from libs.core.users.api.models import User
from libs.core.users.api.permissions.UpdateOwnUser import UpdateOwnUser
from libs.core.users.api.serializers.ForgetPasswordSerializer import ForgetPasswordSerializer
from libs.core.users.api.serializers.PermissionSerializer import PermissionSerializer
from libs.core.users.api.serializers.SetPasswordSerializer import SetPasswordSerializer
from libs.core.users.api.serializers.UserSerializer import UserSerializer


class UserFilter(WebDjangoFilterSet):
    class Meta:
        model = User
        fields = {
            'id': ['in'],
            'first_name': ['contains','exact'],
            'last_name': ['contains','exact'],
        }


class UserViewSet(CreateModelMixin, ListModelMixin, RetrieveModelMixin,
                  UpdateModelMixin, GenericViewSet, DestroyModelMixin):
    """
    Handles:
    Creating an User - Sign Up
    Retrieve a list of users
    Retrieve a specific User
    Update an User
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()
    authentication_classes = (JSONWebTokenAuthentication,)
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    search_fields = ('first_name', 'last_name', 'email', 'username')  # Search field is for the Search Filter ?search=
    filter_class = UserFilter

    def get_permissions(self):
        # TODO: improve
        if self.action == 'sign_up':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    @action(methods=['post'], detail=False, url_path='forget-password')
    def forget_password(self, request):
        """
        The user sends an email, if exists in our database and it is verified. Web Djangular sends a link to be redirect to a page to set a new password.
        :param request:
        :return: HTTP 201 Created
        """

        serializer = ForgetPasswordSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(status=HTTP_201_CREATED)

    @action(methods=['post'], detail=False, url_path='set-password')
    def set_password(self, request):
        """
        Receive the ForgetPassword uuid and the new password.
        There is no 'confirm password' on the server-side. Only on client-side
        :param request:
        :return:
        """

        # check if the Forget Password is valid
        serializer = SetPasswordSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

        forget_password = serializer.validated_data['forget_password']
        user = forget_password.user

        # check if the new password match with all requirements
        serializer = UserSerializer(user, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

        forget_password.delete()
        serializer.save()
        return Response(status=HTTP_204_NO_CONTENT)

    @action(methods=['post'], detail=False, url_path='sign-up')
    def sign_up(self, request, *args, **kwargs):
        """
        Create non-staff users
        :param request:
        :param args:
        :param kwargs:
        :return:
        """

        request.data['is_staff'] = False
        request.data['is_tfa_enabled'] = False
        request.data['is_email_verified'] = False
        request.data['is_mobile_verified'] = False

        if request.data['email']:
            request.data['email'] = request.data['email'].lower()
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            raise ValidationError(serializer.errors)
        serializer.save()

        return Response(serializer.data, status=HTTP_201_CREATED)



