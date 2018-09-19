from webdjangular.webdjango.views.rewrites.CoreRelationshipView import CoreRelationshipView

from ..models.User import User


class UserRelationshipView(CoreRelationshipView):
	resource_name = 'user';
	queryset = User.objects