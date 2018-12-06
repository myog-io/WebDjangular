
from django_prices.templatetags.prices_i18n import get_currency_fraction

DEFAULT_COUNTRY = 'US'
DEFAULT_CURRENCY = 'USD'
DEFAULT_DECIMAL_PLACES = get_currency_fraction(DEFAULT_CURRENCY)
DEFAULT_MAX_DIGITS = 12











