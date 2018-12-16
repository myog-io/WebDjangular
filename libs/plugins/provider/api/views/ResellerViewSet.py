from ..models.Reseller import Reseller
from ..serializers.ResellerSerializer import ResellerSerializer
from django_filters.filterset import FilterSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.viewsets import ModelViewSet
from rest_framework_json_api.views import RelationshipView


class ResellerFilter(FilterSet):
    class Meta:
        model = Reseller
        fields = {
            '_id': ['in'],
            'name': ['contains', 'exact'],
            'email': ['contains', 'exact']
        }


class ResellerViewSet(ModelViewSet):
    """
    Handles:
    Creating Cities
    Retrieve a list of Cities
    Retrieve a specific City
    Update City
    Deleting Cities
    """
    serializer_class = ResellerSerializer
    queryset = Reseller.objects
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = ResellerFilter
    search_fields = ('name')
    permission_classes = ()

class ResellerRelationshipView(RelationshipView):
    queryset = Reseller.objects
