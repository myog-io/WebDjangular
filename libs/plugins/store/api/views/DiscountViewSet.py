from django_filters.filterset import FilterSet
from django_filters.rest_framework.backends import DjangoFilterBackend
from ..models.Discount import CartRule, CatalogRule
from ..models.Product import ProductCategory, Product, ProductType
from ..models.Cart import Cart, CartItem
from webdjango.models.Address import Address
from ..serializers.DiscountSerializer import CartRuleSerializer, CatalogRuleSerializer
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework_json_api.views import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response


def do_prefix(name, prefix):
    if prefix:
        return "%s.%s" % (prefix, name)
    return name

def get_fields_flat(model):
    return [name for name in iter_fields(model)]

def iter_fields(model, prefix=None):
    fields = model._meta.fields
    for field in fields:
        name = do_prefix(field.attname, prefix)
        yield  name
        
        #if field.rel:
        #    rel = field.rel.to
        #    for f in iter_fields(rel, name):
        #        yield f

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
    
    @action(methods=['GET'], detail=False)
    def discount_options(self, request, *args, **kwargs):
        '''
            Return List of availabe Discount Options for The Cart Rules
        '''
        data = {}
        data['cart'] = get_fields_flat(Cart)
        data['billing_address'] = get_fields_flat(Address)
        data['shipping_address'] = data['billing_address']
        return Response(data)

    @action(methods=['GET'], detail=False)
    def discount_options_items(self, request, *args, **kwargs):
        '''
            Return List of availabe Discount Options for The Cart Rules on Itens
        '''
        data = {}
        data['product'] = get_fields_flat(Product)
        data['category'] = get_fields_flat(ProductCategory)
        return Response(data)

    

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

    @action(methods=['GET'], detail=False)
    def discount_options(self, request, *args, **kwargs):
        '''
            Return List of availabe Discount Options for The Catalog Rules
        '''
        data = {}
        data['product'] = get_fields_flat(Product)
        data['category'] = get_fields_flat(ProductCategory)
        data['type'] = get_fields_flat(ProductType)
        return Response(data)
        