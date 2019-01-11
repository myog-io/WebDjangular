from django.http import HttpResponse
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_json_api.views import ModelViewSet
from uuid import UUID, uuid1
from libs.plugins.store.api.models.Cart import Cart
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

    @action(methods=['POST'], detail=False, url_path='add_to_cart')
    def add_to_cart(self, request, *args, **kwargs):

        cart = CartUtils.get_or_create_cart(request)

        self.serializer_class = CartItemSerializer

        serializer = CartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)


        cart = CartUtils.add_item_to_cart(cart, serializer.data)








        # TODO: Check if the product exists
        # TODO: Check if the product is already added on the cart, if it is: increase the qty otherwise: just proceed it
        # TODO: Check if the product qty is available
        # TODO: Do the Cart Rules

        return Response({"cart": cart})
        # return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(methods=['POST'], detail=False, url_path='remove_from_cart')
    def remove_from_cart(self, request, *args, **kwargs):
        # TODO: Check if cart exists
        # TODO: Check the token
        # TODO: Check if the Cart Item exists
        # TODO: Delete it
        # TODO: Do the Cart Rules
        return Response({})
