from django_filters.filterset import FilterSet
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.viewsets import ModelViewSet

from libs.plugins.provider.api.models.City import City
from libs.plugins.provider.api.serializers.CitySerializer import CitySerializer
from drf_yasg.inspectors import base

class CityFilter(FilterSet):
    class Meta:
        model = City
        fields = {
            'id': ['in'],
            'name': ['contains', 'exact'],
            'short_name': ['contains', 'exact']
        }


class CityViewSet(ModelViewSet):
    """
    Handles:
    Creating Pages
    Retrieve a list of Pages
    Retrieve a specific Page
    Update Pages
    Deleting Pages
    """
    serializer_class = CitySerializer
    queryset = City.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter,)
    filter_class = CityFilter
    search_fields = ('name')
    permission_classes = ()
