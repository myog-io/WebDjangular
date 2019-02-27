from webdjango.filters import WebDjangoFilterSet
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import BooleanFilter
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework_json_api.views import ModelViewSet, RelationshipView

from libs.core.cms.api.models.Menu import MenuItem
from libs.core.cms.api.serializers.MenuItemSerializer import MenuItemSerializer

class MenuItemFilter(WebDjangoFilterSet):
    orfan = BooleanFilter(field_name='parent', lookup_expr='isnull')
    class Meta:
        model = MenuItem
        fields = {
            'id': ['in'],
            'name': ['contains', 'exact'],
            'url': ['contains'],
            'parent': ['exact','isnull'],
            'menu':['exact','isnull']
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
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = MenuItemFilter
    permission_classes = ()


class MenuItemRelationshipView(RelationshipView):
    queryset = MenuItem.objects
