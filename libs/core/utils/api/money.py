from django.conf import settings
from prices import Money

ZERO_MONEY = Money(0, settings.DEFAULT_CURRENCY)



def zero_money():
    return ZERO_MONEY
