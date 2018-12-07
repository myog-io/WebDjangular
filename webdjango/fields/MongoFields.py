from bson.decimal128 import Decimal128
from djongo.models import DecimalField

class MongoDecimalField(DecimalField):
    def to_python(self, value):
        if isinstance(value, Decimal128):
            value = value.to_decimal()
        return super().to_python(value)

    def get_prep_value(self, value):
        value = super().get_prep_value(value)
        return Decimal128(value)
