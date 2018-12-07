
from libs.plugins.store.api.models.Discount import Voucher, Sale

from rest_framework_json_api import serializers


class VoucherSerializer(serializers.ModelSerializer):

    class Meta:
        model = Voucher
        fields = '__all__'


class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = '__all__'




