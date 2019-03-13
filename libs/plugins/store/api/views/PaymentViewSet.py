from rest_framework_json_api.views import ModelViewSet

from webdjango.filters import WebDjangoFilterSet

from ..models.Payment import Payment
from ..serializers.PaymentSerializer import PaymentSerializer


class PaymentFilter(WebDjangoFilterSet):
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
    ordering_fields = '__all__'
    filter_class = PaymentFilter
    search_fields = ('name',)
