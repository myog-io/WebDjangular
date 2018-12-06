from djongo import models
from django_countries.fields import CountryField


class AddressType:
    BILLING = 'billing'
    SHIPPING = 'shipping'

    CHOICES = [
        (BILLING, 'Billing'),
        (SHIPPING, 'Shipping')
    ]


class Address(models.Model):
    first_name = models.CharField(max_length=256, blank=True)
    last_name = models.CharField(max_length=256, blank=True)
    company_name = models.CharField(max_length=256, blank=True)
    street_address_1 = models.CharField(max_length=256, blank=True)
    street_address_2 = models.CharField(max_length=256, blank=True)
    city = models.CharField(max_length=256, blank=True)
    state = models.CharField(max_length=128, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)
    country = CountryField()
    country_area = models.CharField(max_length=128, blank=True)
    phone = models.CharField(max_length=64, blank=True)

    @property
    def full_name(self):
        return '%s %s' % (self.first_name, self.last_name)

    def __str__(self):
        if self.company_name:
            return '%s - %s' % (self.company_name, self.full_name)
        return self.full_name

    def __repr__(self):
        return (
            'Address(first_name=%r, last_name=%r, company_name=%r, '
            'street_address_1=%r, street_address_2=%r, city=%r, '
            'postal_code=%r, country=%r, phone=%r)' % (
                self.first_name, self.last_name, self.company_name,
                self.street_address_1, self.street_address_2, self.city,
                self.postal_code, self.country, self.phone))

