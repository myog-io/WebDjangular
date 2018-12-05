from libs.plugins.store.api import defaults
from prices import Money

ZERO_MONEY = Money(0, defaults.DEFAULT_CURRENCY)



def zero_money():
    return ZERO_MONEY
