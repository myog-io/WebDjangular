from django.http import HttpResponse
from django_filters.rest_framework import DjangoFilterBackend
from django_filters.filters import ModelChoiceFilter
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
from ..utils.CartUtils import cart_has_product, create_order, apply_all_cart_rules, apply_cart_terms
from webdjango.filters import WebDjangoFilterSet
from rest_framework import status
from rest_framework.exceptions import ValidationError
from ..emails import send_order_confirmation


class CartTermFilter(WebDjangoFilterSet):
    carts = ModelChoiceFilter(queryset=Cart.objects)
    
    class Meta:
        model = CartTerm
        fields = {
            'id': ['in'],
            'all_carts': ['exact'],
            'enabled': ['exact'],
            'content': ['exact','contains'],
            'position': ['exact'],
            'content': ['contains'],
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
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = CartTermFilter
    search_fields = ('content',)
    permission_classes = ()


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
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = CartFilter
    search_fields = ('name',)
    permission_classes = ()

    def apply_rules(self, instance):
        apply_all_cart_rules(instance)
        apply_cart_terms(instance)

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
        self.apply_rules(instance)
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        self.apply_rules(instance)
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
        
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}
        # Run Rules
        self.apply_rules(instance)
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

    def perform_destroy(self, item):
        ##  Let's Check if theres any terms in the cart that need to be removed
        if item.cart and item.product:
            term = item.cart.terms.filter(products=item.product).first()
            if term:
                item.cart.terms.remove(term)
        item.delete()



class CartItemRelationshipView(RelationshipView):
    queryset = CartItem.objects
