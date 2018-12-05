from django_filters.filterset import FilterSet
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.viewsets import ModelViewSet

from libs.plugins.store.api.models.Discount import Voucher, Sale
from libs.plugins.store.api.serializers.DiscountSerializer import VoucherSerializer, SaleSerializer


class VoucherFilter(FilterSet):
    class Meta:
        model = Voucher
        fields = {
            'id': ['in'],
            'name': ['contains', 'exact'],
            'code': ['contains', 'exact'],
        }


class VoucherViewSet(ModelViewSet):
    """
    Handles:
    Creating Voucher
    Retrieve a list of Vouchers
    Retrieve a specific Voucher
    Update Vouchers
    Deleting Vouchers
    """
    serializer_class = VoucherSerializer
    queryset = Voucher.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter,)
    filter_class = VoucherFilter
    search_fields = ('name', 'code',)
    permission_classes = ()


class SaleFilter(FilterSet):
    class Meta:
        model = Voucher
        fields = {
            'id': ['in'],
            'name': ['contains', 'exact'],
            'code': ['contains', 'exact'],
        }


class SaleViewSet(ModelViewSet):
    """
    Handles:
    Creating Sales
    Retrieve a list of Sales
    Retrieve a specific Sale
    Update Sales
    Deleting Sales
    """
    serializer_class = SaleSerializer
    queryset = Sale.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter,)
    filter_class = SaleFilter
    search_fields = ('name',)
    permission_classes = ()
