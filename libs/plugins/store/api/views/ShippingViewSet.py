from django_filters.filterset import FilterSet
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.viewsets import ModelViewSet

from libs.plugins.store.api.models.Shipping import ShippingMethod
from libs.plugins.store.api.serializers.ShippingSerializer import ShippingMethodSerializer


class ShippingMethodFilter(FilterSet):
    class Meta:
        model = ShippingMethod
        fields = {
            'id': ['in'],
            'name': ['contains', 'exact'],
            'type': ['exact']
        }


class ShippingMethodViewSet(ModelViewSet):
    """
    Handles:
    Creating Shipping Methods
    Retrieve a list of Shipping Methods
    Retrieve a specific Shipping Method
    Update Shipping Methods
    Deleting Shipping Methods
    """
    serializer_class = ShippingMethodSerializer
    queryset = ShippingMethod.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter,)
    filter_class = ShippingMethodFilter
    search_fields = ('name',)
    permission_classes = ()
