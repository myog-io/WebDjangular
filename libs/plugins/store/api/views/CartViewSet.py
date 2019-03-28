from django_filters.filters import ModelChoiceFilter
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework_json_api.views import ModelViewSet, RelationshipView

from webdjango.filters import WebDjangoFilterSet

from ..emails import send_order_confirmation
from ..models.Cart import Cart, CartItem, CartTerm
from ..models.Order import OrderEventTypes
from ..serializers.CartSerializer import (CartItemSerializer, CartSerializer,
                                          CartTermSerializer)
from ..serializers.OrderSerializer import OrderSerializer
from ..utils.CartUtils import (apply_all_cart_rules, cart_has_product,
                               create_order)


class CartTermFilter(WebDjangoFilterSet):
    carts = ModelChoiceFilter(queryset=Cart.objects)

    class Meta:
        model = CartTerm
        fields = {
            'id': ['in'],
            'all_carts': ['exact'],
            'enabled': ['exact'],
            'content': ['exact', 'contains'],
            'position': ['exact'],
        }


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
    ordering_fields = '__all__'
    filter_class = CartTermFilter
    search_fields = ('content',)
    public_views = ('list', 'retrieve')


class CartTermRelationshipView(RelationshipView):
    queryset = CartTerm.objects


class CartFilter(WebDjangoFilterSet):

    class Meta:
        model = Cart
        fields = {
            'id': ['in'],
            'email': ['contains', 'exact'],
            'token': ['exact'],
            'status': ['exact']
        }


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
    ordering_fields = '__all__'
    filter_class = CartFilter
    search_fields = ('name',)
    # TODO: Improve Security we should have some way to know who's the Cart Owner
    # TODO: If there's a User associeted with the instance we need to check if the user is the same as the user requesting
    public_views = ('list', 'retrieve', 'complete_order',
                    'create', 'update', 'partial_update', 'destroy')

    def apply_rules(self, instance):
        apply_all_cart_rules(instance)
        # Removing Cart From Here, shold be added on Signals
        # apply_cart_terms(instance)

    @action(methods=['GET'], detail=True, url_path='complete_order')
    def complete_order(self, request, *args, **kwargs):
        # TODO: If there's a User associeted with the instance we need to check if the user is the same as the user requesting
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
        order.events.create(event_type=OrderEventTypes.PLACED)
        send_order_confirmation(order.pk)
        order.events.create(
            event_type=OrderEventTypes.EMAIL_SENT,
            data={
                'email': order.get_user_current_email(),
            })

        serializer = OrderSerializer(order)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        instance = serializer.instance
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def retrieve(self, request, *args, **kwargs):
        # TODO: If there's a User associeted with the instance we need to check if the user is the same as the user requesting
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        # TODO: If there's a User associeted with the instance we need to check if the user is the same as the user requesting
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}
        # Run Rules

        # Get Instance again
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


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
    ordering_fields = '__all__'
    search_fields = ('product',)
    public_views = ('list', 'retrieve', 'complete_order',
                    'create', 'update', 'partial_update', 'destroy')

    def perform_create(self, serializer):
        validated_data = serializer.validated_data
        # Checking if not adding Duplicated to the Cart
        if validated_data['cart']:
            cart = validated_data['cart']
            item = cart_has_product(
                cart_id=cart.id, product_id=validated_data['product'].id)
            if item:
                serializer.instance = item
                serializer.validated_data['quantity'] = serializer.validated_data['quantity'] + item.quantity
                self.perform_update(serializer)
                return
        serializer.save()

    def perform_update(self, serializer):
        serializer.save()

    def perform_destroy(self, item):
        # Let's Check if theres any terms in the cart that need to be removed
        item.delete()


class CartItemRelationshipView(RelationshipView):
    queryset = CartItem.objects
