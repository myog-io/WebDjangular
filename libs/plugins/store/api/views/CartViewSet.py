from django.http import HttpResponse
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_json_api.views import ModelViewSet, RelationshipView
from uuid import UUID, uuid1
from libs.plugins.store.api.models.Cart import Cart, CartItem
from libs.plugins.store.api.serializers.CartSerializer import CartSerializer, CartItemSerializer
from libs.plugins.store.api.utils import CartUtils


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
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    # filter_class = CartFilter
    search_fields = ('name',)
    permission_classes = ()


class CartRelationshipView(RelationshipView):
    queryset = Cart.objects


class CartItemViewSet(ModelViewSet):
    """
    Handles:
    Creating Cart Items
    Retrieve a list of Cart Items
    Retrieve a specific Cart Item
    Update Cart Items
    Deleting Cart Items
    """
    serializer_class = CartItemSerializer
    queryset = CartItem.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    search_fields = ('product',)
    permission_classes = ()

    def perform_create(self, serializer):
        validated_data = serializer.validated_data
        # Checking if not adding Duplicated to the Cart
        if validated_data['cart']:
            cart = validated_data['cart']
            if cart.items.count() > 0:
                for item in cart.items.all():
                    if item.product.id is validated_data['product'].id:
                        serializer.instance = item
                        serializer.validated_data['quantity'] = serializer.validated_data['quantity'] + item.quantity
                        self.perform_update(serializer)
                        return
        serializer.save()



class CartItemRelationshipView(RelationshipView):
    queryset = CartItem.objects
