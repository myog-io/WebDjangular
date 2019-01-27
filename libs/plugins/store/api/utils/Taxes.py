
from libs.plugins.store.api import defaults
from prices import Money, MoneyRange, TaxedMoney, TaxedMoneyRange

ZERO_MONEY = Money(0, defaults.DEFAULT_CURRENCY)
ZERO_TAXED_MONEY = TaxedMoney(net=ZERO_MONEY, gross=ZERO_MONEY)


def zero_money():
    """Function used as a model's default."""
    return ZERO_MONEY
