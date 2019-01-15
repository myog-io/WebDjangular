from decimal import Decimal

from rest_framework_json_api import serializers

from libs.plugins.store.api import defaults
from libs.plugins.store.api.models.Payment import Transaction, Payment
from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer


class TransactionSerializer(WebDjangoSerializer):

    class Meta:
        model = Transaction
        fields = '__all__'


class PaymentSerializer(WebDjangoSerializer):


    class Meta:
        model = Payment
        fields = '__all__'
