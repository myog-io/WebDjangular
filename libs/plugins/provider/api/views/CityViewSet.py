from django_filters.filterset import FilterSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework_json_api.views import ModelViewSet, RelationshipView

from libs.plugins.provider.api.models.City import PostalCodeRange, Street, NumberRange
from libs.plugins.provider.api.serializers.CitySerializer import PostalCodeRangeSerializer, StreetSerializer, \
    NumberRangeSerializer
from ..models.City import City
from ..serializers.CitySerializer import CitySerializer


class CityFilter(FilterSet):
    class Meta:
        model = City
        fields = {
            'id': ['in', 'exact'],
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
    search_fields = ('name',)
    permission_classes = ()


class CityRelationshipView(RelationshipView):
    queryset = City.objects


class PostalCodeRangeFilter(FilterSet):
    class Meta:
        model = PostalCodeRange
        fields = {
            'id': ['in', 'exact'],
            'start': ['contains', 'exact'],
            'end': ['contains', 'exact']
        }


class PostalCodeRangeViewSet(ModelViewSet):
    """
    Handles:
    Creating Postal Code Ranges
    Retrieve a list of Postal Code Ranges
    Retrieve a specific Postal Code Range
    Update Postal Code Ranges
    Deleting Postal Code Ranges
    """
    serializer_class = PostalCodeRangeSerializer
    queryset = PostalCodeRange.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = PostalCodeRangeFilter
    search_fields = ('start', 'end',)
    permission_classes = ()


class PostalCodeRangeRelationshipView(RelationshipView):
    queryset = PostalCodeRange.objects


class StreetFilter(FilterSet):
    class Meta:
        model = Street
        fields = {
            'id': ['in', 'exact'],
            'name': ['contains', 'exact'],
            'short_name': ['contains', 'exact']
        }


class StreetViewSet(ModelViewSet):
    """
    Handles:
    Creating Streets
    Retrieve a list of Streets
    Retrieve a specific Street
    Update Streets
    Deleting Streets
    """
    serializer_class = StreetSerializer
    queryset = Street.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = StreetFilter
    search_fields = ('name', 'short_name',)
    permission_classes = ()


class StreetRelationshipView(RelationshipView):
    queryset = Street.objects


class NumberRangeFilter(FilterSet):
    class Meta:
        model = NumberRange
        fields = {
            'id': ['in', 'exact'],
            'start': ['contains', 'exact'],
            'end': ['contains', 'exact']
        }


class NumberRangeViewSet(ModelViewSet):
    """
    Handles:
    Creating Number Ranges
    Retrieve a list of Number Ranges
    Retrieve a specific Number Range
    Update Number Ranges
    Deleting Number Ranges
    """
    serializer_class = NumberRangeSerializer
    queryset = NumberRange.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = NumberRangeFilter
    search_fields = ('name', 'short_name',)
    permission_classes = ()


class NumberRangeRelationshipView(RelationshipView):
    queryset = NumberRange.objects


