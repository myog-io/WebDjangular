from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework_json_api.views import ModelViewSet, RelationshipView

from webdjango.filters import WebDjangoFilterSet

from ..models.Order import Order, OrderLine
from ..serializers.OrderSerializer import OrderLineSerializer, OrderSerializer


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
    ordering_fields = '__all__'
    filter_class = OrderFilter
    search_fields = ('order_num',)
    public_views = ('send_email',)

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


class OrderRelationshipView(RelationshipView):
    queryset = Order.objects


class OrderLineViewSet(ModelViewSet):
    """
    Handles:
    Creating Order Lines
    Retrieve a list of Order Lines
    Retrieve a specificOrder Line
    Update Order Lines
    Deleting Order Lines
    """
    serializer_class = OrderLineSerializer
    queryset = OrderLine.objects.all()
    ordering_fields = '__all__'


class OrderLineRelationshipView(RelationshipView):
    queryset = OrderLine.objects
