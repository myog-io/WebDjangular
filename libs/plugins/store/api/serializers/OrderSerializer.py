from rest_framework_json_api.serializers import JSONField
from rest_framework_json_api.relations import ResourceRelatedField

from libs.plugins.store.api import defaults
from libs.plugins.store.api.models.Order import OrderLine, OrderEvent, Order
from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer
from .MoneySerializer import MoneyField


class OrderLineSerializer(WebDjangoSerializer):
    product_data = JSONField(required=False)

    unit_cost = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                           decimal_places=defaults.DEFAULT_DECIMAL_PLACES, read_only=True)
    unit_base_price = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                                 decimal_places=defaults.DEFAULT_DECIMAL_PLACES, read_only=True)
    unit_price = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                            decimal_places=defaults.DEFAULT_DECIMAL_PLACES, read_only=True)
    tax_rate = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                          decimal_places=defaults.DEFAULT_DECIMAL_PLACES, read_only=True)

    class Meta:
        model = OrderLine
        fields = '__all__'


class OrderEventSerializer(WebDjangoSerializer):
    class Meta:
        model = OrderEvent


class OrderSerializer(WebDjangoSerializer):
    lines = ResourceRelatedField(
        many=True,
        queryset=OrderLine.objects,
        required=False,
        related_link_url_kwarg='pk',
        self_link_view_name='order-line-relationships',
        related_link_view_name='order-line-related',
    )

    shipping_price = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                                decimal_places=defaults.DEFAULT_DECIMAL_PLACES, read_only=True)
    taxes = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                       decimal_places=defaults.DEFAULT_DECIMAL_PLACES, read_only=True)
    subtotal = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                          decimal_places=defaults.DEFAULT_DECIMAL_PLACES, read_only=True)
    total = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                       decimal_places=defaults.DEFAULT_DECIMAL_PLACES, read_only=True)

    discount_amount = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                                 decimal_places=defaults.DEFAULT_DECIMAL_PLACES, read_only=True)

    included_serializers = {
        'lines': 'libs.plugins.store.api.serializers.OrderSerializer.OrderLineSerializer',
    }

    class Meta:
        model = Order
        fields = '__all__'
