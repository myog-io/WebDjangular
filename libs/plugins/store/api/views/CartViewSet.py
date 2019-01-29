from django.http import HttpResponse
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_json_api.views import ModelViewSet, RelationshipView
from uuid import UUID, uuid1
from ..models.Cart import Cart, CartItem, CartTerm
from ..models.Order import OrderEventTypes
from ..serializers.CartSerializer import CartSerializer, CartItemSerializer, CartTermSerializer
from ..serializers.OrderSerializer import OrderSerializer
from ..utils import CartUtils
from ..utils.CartUtils import cart_has_product, create_order

from rest_framework import status
from rest_framework.exceptions import ValidationError

class CartTermViewSet(ModelViewSet):
    """
    Handles:
    Creating Cart Terms
    Retrieve a list of Cart Terms
    Retrieve a specific Cart Term
    Update Cart Terms
    Deleting Cart Terms
    """
    serializer_class = CartTermSerializer
    queryset = CartTerm.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    # filter_class = CartFilter
    search_fields = ('content',)
    permission_classes = ()


class CartTermRelationshipView(RelationshipView):
    queryset = CartTerm.objects
    


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

    @action(methods=['GET'], detail=True, url_path='complete_order')
    def complete_order(self, request, *args, **kwargs):
        assert 'pk' in self.kwargs, (
            'Expected view %s to be called with a URL keyword argument '
            'named "%s". Fix your URL conf, or set the `.lookup_field` '
            'attribute on the view correctly.' %
            (self.__class__.__name__, 'pk')
        )
        cart = self.get_object()
        
        order = create_order(cart, request)
        if not order:
            raise ValidationError('Please Review your Cart')
        cart.delete()
        order.events.create(type=OrderEventTypes.PLACED)
        #send_order_confirmation.delay(order.pk)
        #order.events.create(
        #    type=OrderEventTypes.EMAIL_SENT.value,
        #    parameters={
        #        'email': order.get_user_current_email(),
        #        'email_type': OrderEventsEmails.ORDER
        #    })


        serializer = OrderSerializer(order)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


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
            item = cart_has_product(cart, validated_data['product'].id)
            if item:
                serializer.instance = item
                serializer.validated_data['quantity'] = serializer.validated_data['quantity'] + item.quantity
                self.perform_update(serializer)
                return
        serializer.save()


class CartItemRelationshipView(RelationshipView):
    queryset = CartItem.objects
