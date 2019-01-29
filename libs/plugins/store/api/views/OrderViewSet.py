from django_filters.filterset import FilterSet
from django_filters.rest_framework.backends import DjangoFilterBackend
from ..models.Order import Order
from ..models.Cart import Cart
from ..serializers.OrderSerializer import OrderSerializer
from ..utils.CartUtils import create_order
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework_json_api.views import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404


class OrderFilter(FilterSet):
    class Meta:
        model = Order
        fields = {
            'id': ['in'],
            'order_num': ['contains', 'exact'],
            'status': ['exact'],
        }


class OrderViewSet(ModelViewSet):
    """
    Handles:
    Creating Orders
    Retrieve a list of Orders
    Retrieve a specific Order
    Update Orders
    Deleting Orders
    """
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = OrderFilter
    search_fields = ('order_num',)
    permission_classes = ()

    
    """
    Create a model instance.
    """
    def create(self, request, *args, **kwargs):
        print(request.data)
        assert 'cart_id' in request.data, (
            'Expected view %s to be called with post argument '
            'named "cart_id" fix the attribute sent to the correctly.' %
            (self.__class__.__name__, 'pk')
        )
        cart = get_object_or_404(Cart,pk=request.data['cart_id'])
        order = create_order(cart)
        serializer = self.get_serializer(order)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()


