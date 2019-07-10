from rest_framework import permissions


class AuthenticatedViewsetPermission(permissions.BasePermission):
    permissions_map = {
        'view': 'view',
        'create': 'add',
        'delete': 'delete',
        'update': 'change'
    }

    def has_permission(self, request, view):
        if hasattr(view, 'public_views'):
            if view.action and (view.action in view.public_views or hasattr(view.public_views, view.action)):
                # This is a Public View, we should add more security
                # TODO: Improve security for public routes/ NONCE?
                return True
        # print("ACTION!!!!", view.action)

        if hasattr(request, 'user'):
            if request.user.is_staff or request.user.is_superuser:
                return True

            user = request.user
            queryset = view.get_queryset()
            print(queryset)
            model = queryset.model
            model_name = str(model.__name__).lower()
            app_label = model._meta.app_label
            action = view.action
            user_permissions = user.get_all_permissions()

            if view.action in self.permissions_map:
                action = self.permissions_map[view.action]

            permission_ref = str("{app_label}.{action}_{model_name}").format(
                app_label=app_label, model_name=model_name, action=action)

            if permission_ref in user_permissions:
                return True

        return False

    def has_object_permission(self, request, view, obj):
        return True
