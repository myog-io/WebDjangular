from rest_framework_json_api import serializers

from libs.plugins.store.api.models.Discount import CartRule, CatalogRule


class CartRuleSerializer(serializers.ModelSerializer):
    conditions = serializers.JSONField(required=False)

    class Meta:
        model = CartRule
        fields = '__all__'


class CatalogRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogRule
        fields = '__all__'
