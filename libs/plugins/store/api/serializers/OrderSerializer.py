from rest_framework_json_api import serializers

from libs.plugins.store.api.models.Order import OrderLine, OrderEvent, Order
from libs.plugins.store.api.serializers.AddressSerializer import AddressSerializer
from webdjango.serializers.MongoSerializer import EmbeddedSerializer, ArrayModelField


class OrderLineSerializer(EmbeddedSerializer):
    product_name = serializers.CharField()
    product_sku = serializers.CharField()
    is_shipping_required = serializers.BooleanField()
    quantity = serializers.IntegerField()
    quantity_fulfilled = serializers.IntegerField()
    unit_price_gross = serializers.DecimalField(max_digits=5, decimal_places=4)
    unit_price_net = serializers.DecimalField(max_digits=5, decimal_places=4)
    unit_price = serializers.DecimalField(max_digits=5, decimal_places=4)
    tax_rate = serializers.DecimalField(max_digits=5, decimal_places=4)

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

    billing_address = EmbeddedSerializer(serializer=AddressSerializer, blank=True)
    shipping_address = EmbeddedSerializer(serializer=AddressSerializer, blank=True)

    class Meta:
        model = Order
        fields = '__all__'
