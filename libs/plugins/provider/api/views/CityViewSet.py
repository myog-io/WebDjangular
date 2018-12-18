from django_filters.filterset import FilterSet
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.viewsets import ModelViewSet

from ..models.City import City
from ..serializers.CitySerializer import CitySerializer

class CityFilter(FilterSet):
    class Meta:
        model = City
        fields = {
            '_id': ['in', 'exact'],
            'name': ['contains', 'exact'],
            'short_name': ['contains', 'exact'],
            'code': ['contains', 'exact']
        }


class CityViewSet(ModelViewSet):
    """
    Handles:
    Creating Cities
    Retrieve a list of Cities
    Retrieve a specific City
    Update City
    Deleting Cities
    """
    serializer_class = CitySerializer
    queryset = City.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = CityFilter
    search_fields = ('name')
    permission_classes = ()
