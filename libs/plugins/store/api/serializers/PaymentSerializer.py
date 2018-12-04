
from rest_framework_json_api import serializers

from libs.plugins.store.api.models.Payment import Transaction, Payment
from libs.plugins.store.api.serializers.AddressSerializer import AddressSerializer
from webdjango.serializers.MongoSerializer import EmbeddedSerializer, ArrayModelField


class TransactionSerializer(EmbeddedSerializer):

    token = serializers.CharField()
    type = serializers.CharField()
    status = serializers.CharField()
    currency = serializers.CharField()
    amount = serializers.DecimalField()
    error = serializers.CharField()
    gateway_response = serializers.JSONField()

    class Meta:
        model = Transaction
        fields = '__all__'


class PaymentSerializer(serializers.ModelSerializer):
    gateway = serializers.CharField()
    charge_status = serializers.CharField()
    customer_ip_address = serializers.CharField()
    extra_data = serializers.JSONField()
    token = serializers.CharField()
    currency = serializers.CharField()
    total = serializers.DecimalField()
    captured_amount = serializers.DecimalField()
    # cart = serializers.RelatedField()
    # order = serializers.RelatedField()
    cc_last_digits = serializers.CharField()
    cc_brand = serializers.CharField()
    cc_exp_month = serializers.IntegerField()
    cc_exp_year = serializers.IntegerField()

    class Meta:
        model = Payment
        fields = '__all__'


