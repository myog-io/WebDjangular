from django_filters.filters import CharFilter, ModelChoiceFilter
from django_filters.rest_framework.backends import DjangoFilterBackend
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework_json_api.views import ModelViewSet, RelationshipView

from libs.plugins.provider.api.models.City import City
from libs.plugins.provider.api.models.Condo import Condo
from libs.plugins.provider.api.models.PlanType import PlanType
from webdjango.filters import WebDjangoFilterSet
from ..models.Product import (Product, ProductAttribute, ProductCategory,
                              ProductType)
from ..serializers.ProductSerializer import (ProductAttributeSerializer,
                                             ProductCategorySerializer,
                                             ProductSerializer,
                                             ProductTypeSerializer)


class ProductAttributeFilter(WebDjangoFilterSet):
    class Meta:
        model = ProductAttribute
        fields = {
            'id': ['in'],
            'name': ['contains', 'exact'],
            'code': ['contains', 'exact'],
        }


class ProductAttributeViewSet(ModelViewSet):
    """
    Handles:
    Creating Types
    Retrieve a list of Product Types
    Retrieve a specific Product Type
    Update Product Type
    Deleting Product Type
    """
    serializer_class = ProductAttributeSerializer
    queryset = ProductAttribute.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter,
                       filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = ProductAttributeFilter
    search_fields = ('name',)


class ProductAttributeRelationshipView(RelationshipView):
    queryset = ProductAttribute.objects


class ProductTypeFilter(WebDjangoFilterSet):
    class Meta:
        model = ProductType
        fields = {
            'id': ['in'],
            'name': ['contains', 'exact'],
            'code': ['contains', 'exact'],
        }


class ProductTypeViewSet(ModelViewSet):
    """
    Handles:
    Creating Types
    Retrieve a list of Product Types
    Retrieve a specific Product Type
    Update Product Type
    Deleting Product Type
    """
    serializer_class = ProductTypeSerializer
    queryset = ProductType.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter,
                       filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = ProductTypeFilter
    search_fields = ('name',)


class ProductTypeRelationshipView(RelationshipView):
    queryset = ProductType.objects


class ProductCategoryFilter(WebDjangoFilterSet):
    class Meta:
        model = ProductCategory
        fields = {
            'id': ['in'],
            'name': ['contains', 'exact'],
            'description': ['contains'],
        }


class ProductCategoryViewSet(ModelViewSet):
    """
    Handles:
    Creating Categories
    Retrieve a list of Categories
    Retrieve a specific Category
    Update Categories
    Deleting Categories
    """
    serializer_class = ProductCategorySerializer
    queryset = ProductCategory.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter,
                       filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = ProductCategoryFilter
    search_fields = ('name',)


class ProductCategoryRelationshipView(RelationshipView):
    queryset = ProductCategory.objects


class ProductFilter(WebDjangoFilterSet):

    product_class_neq = CharFilter(field_name='product_class', exclude=True)

    class Meta:
        model = Product
        fields = {
            'id': ['in', 'exact'],
            'name': ['contains', 'exact'],
            'sku': ['contains', 'exact', 'in'],
            'description': ['contains'],
            'product_class': ['contains', 'exact'],
            'product_class_neq': ['in', 'exact'],
            # TODO: This Should Be Dynamic, using signals
            'condos__id': ['in', 'exact'],
            'plan_types__id': ['in', 'exact'],
            'city__id': ['in', 'exact'],
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
    filter_backends = (filters.SearchFilter,
                       filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = ProductFilter
    search_fields = ('name',)


class ProductRelationshipView(RelationshipView):
    queryset = Product.objects
