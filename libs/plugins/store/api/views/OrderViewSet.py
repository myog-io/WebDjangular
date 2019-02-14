from webdjango.filters import WebDjangoFilterSet
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
from rest_framework.exceptions import NotFound



class OrderFilter(WebDjangoFilterSet):
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
       raise NotFound("Cant Create Order Manually")

    def perform_create(self, serializer):
        serializer.save()

    @action(methods=['GET'], detail=True, url_path='send_email')
    def send_email(self, request, *args, **kwargs):
        print("HERE??!?!?!")
        from ..emails import send_order_confirmation
        order = self.get_object()
        send_order_confirmation(order.pk)
        return Response({})

