from webdjango.views.rewrites.CoreRelationshipView import CoreRelationshipView

from django.contrib.auth.models import Group


class GroupRelationshipView(CoreRelationshipView):
	queryset = Group.objects
