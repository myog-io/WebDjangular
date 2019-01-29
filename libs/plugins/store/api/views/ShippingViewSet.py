from django_filters.filterset import FilterSet
from django_filters.rest_framework.backends import DjangoFilterBackend
from ..models.Shipping import ShippingMethod
from ..serializers.ShippingSerializer import ShippingMethodSerializer
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework_json_api.views import ModelViewSet


class ShippingMethodFilter(FilterSet):
    class Meta:
        model = ShippingMethod
        fields = {
            'id': ['in'],
            'name': ['contains', 'exact'],
            'method_type': ['exact']
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
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = ShippingMethodFilter
    search_fields = ('name',)
    permission_classes = ()
