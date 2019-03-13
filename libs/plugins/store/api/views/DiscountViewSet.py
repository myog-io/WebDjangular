from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_json_api.views import ModelViewSet

from webdjango.filters import WebDjangoFilterSet
from webdjango.models.Address import Address

from ..models.Cart import Cart, CartItem
from ..models.Discount import CartRule, CatalogRule
from ..models.Product import Product, ProductCategory, ProductType
from ..serializers.DiscountSerializer import (CartRuleSerializer,
                                              CatalogRuleSerializer)


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
        yield name

        # if field.rel:
        #    rel = field.rel.to
        #    for f in iter_fields(rel, name):
        #        yield f


class CartRuleFilter(WebDjangoFilterSet):
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
    ordering_fields = '__all__'
    filter_class = CartRuleFilter
    search_fields = ('name', 'code',)

    @action(methods=['GET'], detail=False)
    def discount_options(self, request, *args, **kwargs):
        '''
            Return List of availabe Discount Options for The Cart Rules
        '''
        data = {}
        data['cart'] = get_fields_flat(Cart)

        data['billing_address'] = get_fields_flat(Address)
        data['shipping_address'] = data['billing_address']
        data['product'] = get_fields_flat(Product)
        data['item'] = get_fields_flat(CartItem)
        return Response(data)

    @action(methods=['GET'], detail=False)
    def discount_options_items(self, request, *args, **kwargs):
        '''
            Return List of availabe Discount Options for The Cart Rules on Itens
        '''
        data = {}
        data['product'] = get_fields_flat(Product)
        data['item'] = get_fields_flat(CartItem)
        data['product_type'] = get_fields_flat(ProductType)
        data['category'] = get_fields_flat(ProductCategory)
        return Response(data)


class CatalogRuleFilter(WebDjangoFilterSet):
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
    ordering_fields = '__all__'
    filter_class = CatalogRuleFilter
    search_fields = ('name',)

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
