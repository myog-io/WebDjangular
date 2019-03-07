import json
from prices import Money
from .serializers.MoneySerializer import MoneyField
from libs.plugins.store.api import defaults
from decimal import Decimal

class fakefloat(float):
    def __init__(self, value):
        self._value = value
    def __repr__(self):
        return str(self._value)

class StoreJSONEncoder(json.JSONEncoder):
    """
    JSONEncoder subclass that knows how to encode date/time, decimal types, and
    UUIDs.
    """
    def default(self, o):
        if isinstance(o, Decimal):
            return fakefloat(o)
        elif isinstance(o, Money):
            money_serializer = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                              decimal_places=defaults.DEFAULT_DECIMAL_PLACES, read_only=True)
            return money_serializer.to_representation(o)
        else:
            return super().default(o)
