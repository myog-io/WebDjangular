from django.contrib.auth.models import Permission

from rest_framework.serializers import ModelSerializer


class PermissionSerializer(ModelSerializer):

	included_serializers = {
		'content_type': 'webdjangular.core.users.serializers.ContentTypeSerializer.ContentTypeSerializer'
	}

	#permissions = ResourceRelatedField(
	#    read_only=True,
	#    many=False,
	#    related_link_view_name='permission-getgrouplist',
	#    related_link_url_kwarg='group_pk',
	#    self_link_view_name='group-relationships',
	#)

	class Meta:
		model = Permission
		fields = ('id', 'name', 'content_type', 'codename')