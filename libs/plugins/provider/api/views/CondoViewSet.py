from ..models.Condo import Condo
from ..serializers.CondoSerializer import CondoSerializer
from django_filters.filterset import FilterSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework_json_api.views import ModelViewSet
from rest_framework_json_api.views import RelationshipView
from .CityViewSet import CityFilter
from ..models.City import City

class CondoFilter(FilterSet):
    class Meta:
        model = Condo
        fields = {
            'id': ['in'],
            'name': ['contains', 'exact'],
            'city__name': ['contains', 'exact'],
            'city__id': ['in', 'exact'],
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
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = CondoFilter
    search_fields = ('name')
    permission_classes = ()

class CondoRelationshipView(RelationshipView):
    queryset = Condo.objects
