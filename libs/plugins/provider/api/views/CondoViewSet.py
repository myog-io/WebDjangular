
from rest_framework_json_api.views import ModelViewSet, RelationshipView

from webdjango.filters import WebDjangoFilterSet

from ..models.Condo import Condo
from ..serializers.CondoSerializer import CondoSerializer


class CondoFilter(WebDjangoFilterSet):
    class Meta:
        model = Condo
        fields = {
            'id': ['in'],
            'name': ['contains', 'exact'],
            'city__name': ['contains', 'exact'],
            'city__id': ['in', 'exact'],
            'city': ['in', 'exact'],
        }


class CondoViewSet(ModelViewSet):
    """
    Handles:
    Creating Cities
    Retrieve a list of Cities
    Retrieve a specific City
    Update City
    Deleting Cities
    """
    serializer_class = CondoSerializer
    queryset = Condo.objects.all()
    ordering_fields = '__all__'
    filter_class = CondoFilter
    search_fields = ('name')
    public_views = ('list', 'retrieve')


class CondoRelationshipView(RelationshipView):
    queryset = Condo.objects
