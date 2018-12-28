from decimal import Decimal

from rest_framework_json_api import serializers

from libs.plugins.store.api import defaults
from libs.plugins.store.api.models.Order import OrderLine, OrderEvent, Order
from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer


class OrderLineSerializer(WebDjangoSerializer):


    class Meta:
        model = OrderLine
        fields = '__all__'


class OrderEventSerializer(WebDjangoSerializer):

    class Meta:
        model = OrderEvent


class OrderSerializer(WebDjangoSerializer):

    class Meta:
        model = Order
        fields = '__all__'
