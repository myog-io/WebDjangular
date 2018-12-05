from decimal import Decimal

from rest_framework_json_api import serializers

from libs.plugins.store.api import defaults
from libs.plugins.store.api.models.Payment import Transaction, Payment
from webdjango.serializers.MongoSerializer import EmbeddedSerializer


class TransactionSerializer(EmbeddedSerializer):
    token = serializers.CharField()
    type = serializers.CharField()
    status = serializers.CharField()
    currency = serializers.CharField()
    amount = serializers.DecimalField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                                      decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
                                      default=Decimal('0.0'))
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
    total = serializers.DecimalField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                                     decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
                                     default=Decimal('0.0'))
    captured_amount = serializers.DecimalField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                                               decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
                                               default=Decimal('0.0'))
    # cart = serializers.RelatedField()
    # order = serializers.RelatedField()
    cc_last_digits = serializers.CharField()
    cc_brand = serializers.CharField()
    cc_exp_month = serializers.IntegerField()
    cc_exp_year = serializers.IntegerField()

    class Meta:
        model = Payment
        fields = '__all__'
