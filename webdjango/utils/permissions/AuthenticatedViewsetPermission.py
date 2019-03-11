from rest_framework import permissions


class AuthenticatedViewsetPermission(permissions.BasePermission):
    permissionsMap = {
        'view': 'view',
        'create': 'add',
        'delete': 'delete',
        'update': 'change'
    }

    def has_permission(self, request, view):
        if hasattr(request, 'user'):
            print("USER: ",request.user)
            if request.user.is_staff or request.user.is_superuser:
                return True

            user = request.user
            queryset = view.get_queryset()
            model = queryset.model
            modelName = str(model.__name__).lower()
            app_label = model._meta.app_label
            action = view.action
            userPermissions = user.get_all_permissions()

            if view.action in self.permissionsMap:
                action = self.permissionsMap[view.action]

            permissionRef = str("{app_label}.{action}_{model_name}").format(
                app_label=app_label, model_name=modelName, action=action)

            if permissionRef in userPermissions:
                return True

        return False

    def has_object_permission(self, request, view, obj):
        print("has_object_permission")
        return True
