from rest_framework_json_api.views import ModelViewSet

from webdjango.filters import WebDjangoFilterSet

from ..models.Address import Address
from ..serializers.AddressSerializer import AddressSerializer


class AddressFilter(WebDjangoFilterSet):
    class Meta:
        model = Address
        fields = {
            'first_name': ['contains', 'exact'],
            'last_name': ['contains', 'exact'],
            'company_name': ['contains', 'exact'],
            'street_address_1': ['contains', 'exact'],
            'street_address_2': ['contains', 'exact'],
            'street_address_3': ['contains', 'exact'],
            'number': ['contains', 'exact'],
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
    ordering_fields = '__all__'
    filter_class = AddressFilter
    search_fields = ('name',)
    public_views = ('create', 'update', 'partial_update')
