from django.contrib.auth.models import Group

from webdjango.views.rewrites.CoreRelationshipView import CoreRelationshipView


class GroupRelationshipView(CoreRelationshipView):
    queryset = Group.objects
