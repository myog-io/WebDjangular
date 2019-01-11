from django_filters.filterset import FilterSet
from django_filters.rest_framework.backends import DjangoFilterBackend
from ..models.Payment import Payment
from ..serializers.PaymentSerializer import PaymentSerializer
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework_json_api.views import ModelViewSet


class PaymentFilter(FilterSet):
    class Meta:
        model = Payment
        fields = {
            'id': ['in'],
            'charge_status': ['exact'],
            'customer_ip_address': ['contains', 'exact'],
            'total': ['exact'],
            'cc_last_digits': ['exact'],
        }


class PaymentViewSet(ModelViewSet):
    """
    Handles:
    Creating Payments
    Retrieve a list of Payments
    Retrieve a specific Payment
    Update Payments
    Deleting Payments
    """
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = PaymentFilter
    search_fields = ('name',)
    permission_classes = ()
