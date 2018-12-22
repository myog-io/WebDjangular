from decimal import Decimal
from enum import Enum

from django.db import models
from django_mysql.models import JSONField

from libs.plugins.store.api import defaults
from webdjango.models.Address import Address
from webdjango.models.AbstractModels import ActiveModel, BaseModel


class TransactionError(Enum):
    DECLINED = 'declined'
    EXPIRED = 'expired'
    INCORRECT_NUMBER = 'incorrect_number'
    INCORRECT_ZIP = 'incorrect_zip'
    INCORRECT_ADDRESS = 'incorrect_address'
    INCORRECT_CVV = 'incorrect_cvv'
    INVALID_NUMBER = 'invalid_number'
    INVALID_CVV = 'invalid_cvv'
    INVALID_EXPIRY_DATE = 'invalid_expiry_date'
    PROCESSING_ERROR = 'processing_error'


class TransactionTypes:
    """
    - Authorization: An amount reserved against the customer's funding source.
                    Money does not change hands until the authorization is captured.
    - Charge: Authorization and capture in a single step.
    - Void: A cancellation of a pending authorization or capture.
    - Capture: A transfer of the money that was reserved during the
               authorization stage.
    - Refund: Full or partial return of captured funds to the customer.
    """

    AUTH = 'auth'
    CHARGE = 'charge'
    CAPTURE = 'capture'
    VOID = 'void'
    REFUND = 'refund'

    CHOICES = [(AUTH, 'Authorization'),
               (CHARGE, 'Charge'),
               (REFUND, 'Refund'),
               (CAPTURE, 'Capture'),
               (VOID, 'Void')
               ]


class TransactionStatus:
    SUCCESS = 'success'
    ERROR = 'error'
    PENDING = 'pending'

    CHOICES = [(SUCCESS, 'success'),
               (ERROR, 'error'),
               (PENDING, 'pending'),
               ]


class ChargeStatus:
    """
    - Charged: Funds were taken off the customer founding source, partly or
               completely covering the payment amount.
    - Not charged: No funds were take off the customer founding source yet.
    - Fully refunded: All charged funds were returned to the customer.
    """
    CHARGED = 'charged'
    NOT_CHARGED = 'not-charged'
    REFUNDED = 'refunded'

    CHOICES = [
        (CHARGED, 'Charged'),
        (NOT_CHARGED, 'Not-charged'),
        (REFUNDED, 'Refunded')
    ]


class Transaction(models.Model):
    token = models.CharField(max_length=128, blank=True, default='')
    type = models.CharField(max_length=10, choices=TransactionTypes.CHOICES)
    status = models.CharField(max_length=10, choices=TransactionStatus.CHOICES)
    currency = models.CharField(max_length=10)

    amount = models.DecimalField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                                 decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
                                 default=Decimal('0.0'))

    error = models.CharField(choices=[(transaction_error, transaction_error.value)
                                      for transaction_error in TransactionError],
                             max_length=256, null=True)
    gateway_response = JSONField()


class Payment(ActiveModel, BaseModel):
    gateway = models.CharField(max_length=255)

    charge_status = models.CharField(max_length=15,
                                     choices=ChargeStatus.CHOICES,
                                     default=ChargeStatus.NOT_CHARGED)

    billing_address = models.ForeignKey(Address, related_name='', on_delete=models.CASCADE, blank=True, null=True)

    customer_ip_address = models.GenericIPAddressField(blank=True, null=True)
    extra_data = JSONField()

    token = models.CharField(max_length=128, blank=True, default='')

    currency = models.CharField(max_length=10)

    total = models.DecimalField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                                decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
                                default=Decimal('0.0'))

    captured_amount = models.DecimalField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                                          decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
                                          default=Decimal('0.0'))

    # cart = models.ForeignKey(Cart, null=True, related_name='payments', on_delete=models.SET_NULL)

    # order = models.ForeignKey(Order, null=True, related_name='payments', on_delete=models.PROTECT)

    cc_last_digits = models.CharField(max_length=4, blank=True, default='')
    cc_brand = models.CharField(max_length=40, blank=True, default='')
    cc_exp_month = models.PositiveIntegerField(null=True, blank=True)
    cc_exp_year = models.PositiveIntegerField(null=True, blank=True)
