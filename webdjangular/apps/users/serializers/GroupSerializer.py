from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import ValidationError

from django.contrib.auth.models import Group
from django.contrib.auth.models import Permission

from rest_framework_json_api.relations import ResourceRelatedField


class GroupSerializer(ModelSerializer):
    """
    The serializer for Group Objects
    """

    included_serializers = {
        'permissions': 'webdjangular.apps.users.serializers.PermissionSerializer.PermissionSerializer'
    }

    permissions = ResourceRelatedField(
        queryset=Permission.objects,
        many=True,
        related_link_view_name='permission-getgrouplist',
        related_link_url_kwarg='group_pk',
        self_link_view_name='group-relationships'
    )


    class Meta:
        model = Group
        fields = ('id', 'name', 'permissions')
    

    def validate_name(self, value):
        """
        Check if the name is unique case insensitive
        :param value: the name
        :return:
        """
        group = Group.objects.filter(name__iexact=value).first()
        if group is not None:
            raise ValidationError({'name':"Must be unique"})
        return value