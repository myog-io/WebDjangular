from django_filters.filterset import FilterSet
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.viewsets import ModelViewSet

from libs.plugins.store.api.models.Cart import Cart
from libs.plugins.store.api.serializers.CartSerializer import CartSerializer

"""
class CartFilter(FilterSet):
    class Meta:
        model = Cart
        fields = {
            'id': ['in'],
            'name': ['contains', 'exact'],
            'sku': ['contains', 'exact'],
            'description': ['contains'],
        }
"""


class CartViewSet(ModelViewSet):
    """
    Handles:
    Creating Product
    Retrieve a list of Products
    Retrieve a specific Products
    Update Products
    Deleting Products
    """
    serializer_class = CartSerializer
    queryset = Cart.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter,)
    # filter_class = CartFilter
    search_fields = ('name',)
    permission_classes = ()
