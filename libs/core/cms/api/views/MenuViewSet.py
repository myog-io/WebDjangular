from rest_framework_json_api.views import ModelViewSet, RelationshipView

from libs.core.cms.api.models.Menu import Menu
from libs.core.cms.api.serializers.MenuSerializer import MenuSerializer


class MenuViewSet(ModelViewSet):
    """
    Handles:
    Creating Pages
    Retrieve a list of Pages
    Retrieve a specific Page
    Update Pages
    Deleting Pages
    """
    serializer_class = MenuSerializer
    queryset = Menu.objects.all()
    ordering_fields = '__all__'
    public_views = ('list',)


class MenuRelationshipView(RelationshipView):
    queryset = Menu.objects
