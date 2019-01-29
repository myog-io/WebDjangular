from decimal import Decimal

from rest_framework_json_api import serializers

from libs.plugins.store.api import defaults
from libs.plugins.store.api.models.Order import OrderLine, OrderEvent, Order
from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer
from .MoneySerializer import MoneyField

class OrderLineSerializer(WebDjangoSerializer):


    class Meta:
        model = OrderLine
        fields = '__all__'


class OrderEventSerializer(WebDjangoSerializer):

    class Meta:
        model = OrderEvent


class OrderSerializer(WebDjangoSerializer):
    shipping_price = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                              decimal_places=defaults.DEFAULT_DECIMAL_PLACES,read_only=True)
    taxes = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                              decimal_places=defaults.DEFAULT_DECIMAL_PLACES,read_only=True)                         
    taxes = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                              decimal_places=defaults.DEFAULT_DECIMAL_PLACES,read_only=True)
    subtotal = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                              decimal_places=defaults.DEFAULT_DECIMAL_PLACES,read_only=True)                            
    total = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                              decimal_places=defaults.DEFAULT_DECIMAL_PLACES,read_only=True)

    discount_amount = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                              decimal_places=defaults.DEFAULT_DECIMAL_PLACES,read_only=True)
    class Meta:
        model = Order
        fields = '__all__'
