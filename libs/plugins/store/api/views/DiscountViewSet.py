from django_filters.filterset import FilterSet
from django_filters.rest_framework.backends import DjangoFilterBackend
from ..models.Discount import CartRule, CatalogRule
from ..serializers.DiscountSerializer import CartRuleSerializer, CatalogRuleSerializer
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework_json_api.views import ModelViewSet


class CartRuleFilter(FilterSet):
    class Meta:
        model = CartRule
        fields = {
            'id': ['in'],
            'name': ['contains', 'exact'],
            'voucher': ['exact'],
        }


class CartRuleViewSet(ModelViewSet):
    """
    Handles:
    Creating Cart Rules
    Retrieve a list of Cart Rules
    Retrieve a specific Cart Rule
    Update Cart Rules
    Deleting Cart Rules
    """
    serializer_class = CartRuleSerializer
    queryset = CartRule.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = CartRuleFilter
    search_fields = ('name', 'code',)
    permission_classes = ()


class CatalogRuleFilter(FilterSet):
    class Meta:
        model = CatalogRule
        fields = {
            'id': ['in'],
        }


class CatalogRuleViewSet(ModelViewSet):
    """
    Handles:
    Creating Catalog Rules
    Retrieve a list of Catalog Rules
    Retrieve a specific Catalog Rule
    Update Catalog Rules
    Deleting Catalog Rules
    """
    serializer_class = CatalogRuleSerializer
    queryset = CatalogRule.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = CatalogRuleFilter
    search_fields = ('name',)
    permission_classes = ()
