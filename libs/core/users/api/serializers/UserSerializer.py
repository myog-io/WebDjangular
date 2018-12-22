from ..models.User import User
from django.contrib.auth.models import Group
from django.db import models
from rest_framework.serializers import ValidationError
from rest_framework_json_api.relations import ResourceRelatedField
from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer


class UserSerializer(WebDjangoSerializer):
    """
    The serializer for User Objects
    """
    included_serializers = {
        'groups': 'libs.core.users.api.serializers.GroupSerializer.GroupSerializer'
    }

    groups = ResourceRelatedField(
        queryset=Group.objects,
        many=True,
        related_link_view_name='group-getuserlist',
        related_link_url_kwarg='user_pk',
        self_link_view_name='user-relationships'
    )

    class Meta:
        model = User
        fields = '__all__'
        read_only = (
            'last_login','is_superuser', 'is_email_verified',
            'is_mobile_verified', 'is_active', 'is_staff',
            'created', 'updated'
        )
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }


    def create(self, validated_data):
        """
        Create and return a new user
        :param validated_data:
        :return: User Object
        """
        if not 'username' in validated_data:
            validated_data['username'] = validated_data['email']
        else:
            if validated_data['username'] == None:
                validated_data['username'] = validated_data['email']


        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )

        if 'password' in validated_data:
            if validated_data['password'] != None:
                user.set_password(validated_data['password'])

        user.save()

        return user


    def update(self, instance, validated_data):
        user = super(UserSerializer, self).update(instance, validated_data);

        if 'password' in validated_data:
            if validated_data['password'] != None:
                user.set_password(validated_data['password']);
                user.save();

        return user;
