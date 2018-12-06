from django_filters.filterset import FilterSet
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.viewsets import ModelViewSet

from libs.core.utils.api.models.Address import Address
from libs.core.utils.api.serializers.AddressSerializer import AddressSerializer


class AddressFilter(FilterSet):
    class Meta:
        model = Address
        fields = {
            'id': ['in'],
            'first_name': ['contains', 'exact'],
            'last_name': ['contains', 'exact'],
            'company_name': ['contains', 'exact'],
            'street_address_1': ['contains', 'exact'],
            'street_address_2': ['contains', 'exact'],
            'city': ['contains', 'exact'],
            'state': ['contains', 'exact'],
            'postal_code': ['exact'],
            'country': ['exact'],
            'country_area': ['exact'],
            'phone': ['contains', 'exact'],
        }


class AddressViewSet(ModelViewSet):
    """
    Handles:
    Creating Addresses
    Retrieve a list of Addresses
    Retrieve a specific Address
    Update Addresses
    Deleting Addresses
    """
    serializer_class = AddressSerializer
    queryset = Address.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter,)
    filter_class = AddressFilter
    search_fields = ('name',)
    permission_classes = ()
