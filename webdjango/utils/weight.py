from decimal import Decimal
from enum import Enum

from measurement.measures import Weight


class WeightUnits:
    KILOGRAM = 'kg'
    POUND = 'lb'
    OUNCE = 'oz'
    GRAM = 'g'

    CHOICES = [
        (KILOGRAM, 'kg'),
        (POUND, 'lb'),
        (OUNCE, 'oz'),
        (GRAM, 'g')]


def zero_weight():
    return Weight(kg=0)


def convert_weight(weight, unit):
    converted_weight = getattr(weight, unit)
    return Weight(**{unit: converted_weight})
