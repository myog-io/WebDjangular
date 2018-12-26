from rest_framework.serializers import DecimalField, ModelSerializer

from django_prices.models import MoneyField as ModelField
from django_prices.models import Money

#from djmoney.utils import MONEY_CLASSES, get_currency_field_name
MONEY_CLASSES = (Money, ModelField)

class MoneyField(DecimalField):
    """
    Treats ``Money`` objects as decimal values in representation and
    does decimal's validation during transformation to native value.
    """

    def to_representation(self, obj):
        """
        When ``field_currency`` is not in ``self.validated_data`` then ``obj`` is an instance of ``Decimal``, otherwise
        it is ``Money``.
        """
        if isinstance(obj, MONEY_CLASSES):
            obj = obj.amount
        return super(MoneyField, self).to_representation(obj)

    def to_internal_value(self, data):
        if isinstance(data, MONEY_CLASSES):
            amount = super(MoneyField, self).to_internal_value(data.amount)
            return Money(amount, data.currency)
        return super(MoneyField, self).to_internal_value(data)

    def get_value(self, data):
        amount = super(MoneyField, self).get_value(data)
        currency = data.get('currency', None)
        if currency:
            return Money(amount, currency)
        return amount


def register_money_field():
    ModelSerializer.serializer_field_mapping[ModelField] = MoneyField
