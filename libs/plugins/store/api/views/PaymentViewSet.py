from django_filters.filterset import FilterSet
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.viewsets import ModelViewSet

from libs.plugins.store.api.models.Payment import Payment
from libs.plugins.store.api.serializers.PaymentSerializer import PaymentSerializer


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
    filter_backends = (filters.SearchFilter,)
    filter_class = PaymentFilter
    search_fields = ('name',)
    permission_classes = ()
