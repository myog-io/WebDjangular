from webdjango.views.rewrites.CoreRelationshipView import CoreRelationshipView

from ..models.User import User


class UserRelationshipView(CoreRelationshipView):
    queryset = User.objects
