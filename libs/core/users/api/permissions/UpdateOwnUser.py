from rest_framework.permissions import BasePermission
from rest_framework.permissions import SAFE_METHODS

class UpdateOwnUser(BasePermission):
    """
    Allow users to update their own User data
    """
    
    def has_object_permission(self, request, view, obj):
        """
        Check if the user is trying to update their own account
        :param request:
        :param view:
        :param obj:
        :return: boolean
        """

        if request.method in SAFE_METHODS:
            return True

        return obj.id == request.user.id
