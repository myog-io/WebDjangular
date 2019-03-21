from django_filters import BooleanFilter
from rest_framework_json_api.views import ModelViewSet, RelationshipView

from libs.core.cms.api.models.Menu import MenuItem
from libs.core.cms.api.serializers.MenuItemSerializer import MenuItemSerializer
from webdjango.filters import WebDjangoFilterSet


class MenuItemFilter(WebDjangoFilterSet):

    class Meta:
        model = MenuItem
        fields = {
            'id': ['in'],
            'name': ['contains', 'exact'],
            'url': ['contains'],
            'parent': ['exact', 'isnull'],
            'menu': ['exact', 'isnull'],

        }


class MenuItemViewSet(ModelViewSet):
    """
    Handles:
    Creating Pages
    Retrieve a list of Pages
    Retrieve a specific Page
    Update Pages
    Deleting Pages
    """
    serializer_class = MenuItemSerializer
    queryset = MenuItem.objects.all()
    ordering_fields = '__all__'
    filter_class = MenuItemFilter
    public_views = ('list',)


class MenuItemRelationshipView(RelationshipView):
    queryset = MenuItem.objects
