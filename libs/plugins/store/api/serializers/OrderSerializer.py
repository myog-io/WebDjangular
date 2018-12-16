from decimal import Decimal

from rest_framework_json_api import serializers

from libs.plugins.store.api import defaults
from libs.plugins.store.api.models.Order import OrderLine, OrderEvent, Order
from webdjango.serializers.MongoSerializer import EmbeddedSerializer


class OrderLineSerializer(EmbeddedSerializer):
    product_name = serializers.CharField()
    product_sku = serializers.CharField()
    is_shipping_required = serializers.BooleanField()
    quantity = serializers.IntegerField()
    quantity_fulfilled = serializers.IntegerField()
    unit_price_gross = serializers.DecimalField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                                                decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
                                                default=Decimal('0.0'))
    unit_price_net = serializers.DecimalField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                                              decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
                                              default=Decimal('0.0'))
    unit_price = serializers.DecimalField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                                          decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
                                          default=Decimal('0.0'))
    tax_rate = serializers.DecimalField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                                        decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
                                        default=Decimal('0.0'))

    class Meta:
        model = OrderLine
        fields = '__all__'


class OrderEventSerializer(EmbeddedSerializer):
    type = serializers.CharField()
    data = serializers.JSONField()

    class Meta:
        model = OrderEvent


class OrderSerializer(serializers.ModelSerializer):
    order_num = serializers.CharField()
    status = serializers.CharField()
    # user = serializers.RelatedField()
    user_email = serializers.EmailField()

    # billing_address = EmbeddedSerializer(serializer=AddressSerializer, blank=True)
    # shipping_address = EmbeddedSerializer(serializer=AddressSerializer, blank=True)

    class Meta:
        model = Order
        fields = '__all__'
