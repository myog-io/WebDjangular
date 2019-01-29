from rest_framework_json_api import serializers

from libs.plugins.store.api.models.Shipping import ShippingMethod


class ShippingMethodSerializer(serializers.ModelSerializer):
    # shipping_zone = EmbeddedSerializer( blank=True)

    class Meta:
        model = ShippingMethod
        fields = '__all__'
