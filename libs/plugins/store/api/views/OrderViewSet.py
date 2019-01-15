from django_filters.filterset import FilterSet
from django_filters.rest_framework.backends import DjangoFilterBackend
from ..models.Order import Order
from ..serializers.OrderSerializer import OrderSerializer
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework_json_api.views import ModelViewSet


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

