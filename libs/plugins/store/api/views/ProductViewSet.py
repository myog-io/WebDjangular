from django_filters.filterset import FilterSet
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.viewsets import ModelViewSet

from libs.plugins.store.api.models.Product import Product
from libs.plugins.store.api.serializers.ProductSerializer import ProductSerializer


class ProductFilter(FilterSet):
    class Meta:
        model = Product
        fields = {
            'id': ['in'],
            'name': ['contains', 'exact'],
            'sku': ['contains', 'exact'],
            'description': ['contains'],
        }


class ProductViewSet(ModelViewSet):
    """
    Handles:
    Creating Product
    Retrieve a list of Products
    Retrieve a specific Products
    Update Products
    Deleting Products
    """
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter,)
    filter_class = ProductFilter
    search_fields = ('name',)
    permission_classes = ()