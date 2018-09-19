from webdjangular.webdjango.views.rewrites.CoreRelationshipView import CoreRelationshipView

from django.contrib.auth.models import Group


class GroupRelationshipView(CoreRelationshipView):
	resource_name = 'group';
	queryset = Group.objects