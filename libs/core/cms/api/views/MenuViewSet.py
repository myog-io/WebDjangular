from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework_json_api.views import ModelViewSet, RelationshipView

from libs.core.cms.api.models.Menu import Menu
from libs.core.cms.api.serializers.MenuSerializer import MenuSerializer
from webdjango.filters import WebDjangoFilterSet


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
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter,
                       filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'


class MenuRelationshipView(RelationshipView):
    queryset = Menu.objects
