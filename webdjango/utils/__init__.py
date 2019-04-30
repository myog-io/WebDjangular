#from geolite2 import geolite2
from urllib.parse import urljoin

from django.conf import settings
from django.utils.encoding import iri_to_uri, smart_text

from ..i18n import COUNTRY_CODE_CHOICES


def get_country_name_by_code(country_code):
    country_name = next(
        (name for code, name in COUNTRY_CODE_CHOICES if code == country_code),
        country_code)
    return country_name


def build_absolute_uri(location, request=None):
    # type: (str, bool, saleor.site.models.SiteSettings) -> str
    from ..models.Core import Website

    website = Website.get_current_website(request)
    current_uri = '%s://%s' % (website.protocol, website.domain)
    location = urljoin(current_uri, location)
    return iri_to_uri(location)


def get_client_ip(request):
    from ipware import get_client_ip
    ip, is_routable = get_client_ip(request)
    return ip


# def get_country_by_ip(ip_address):
#     geo_data = georeader.get(ip_address)
#     if (
#             geo_data and
#             'country' in geo_data and
#             'iso_code' in geo_data['country']):
#         country_iso_code = geo_data['country']['iso_code']
#         if country_iso_code in countries:
#             return Country(country_iso_code)
#     return None
#

# def get_currency_for_country(country):
#     currencies = get_territory_currencies(country.code)
#     if currencies:
#         return currencies[0]
#     return settings.DEFAULT_CURRENCY
