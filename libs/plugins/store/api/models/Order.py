from decimal import Decimal
from enum import Enum

from django_prices.models import MoneyField, TaxedMoneyField
from djongo import models
from djongo.models.json import JSONField

from libs.core.users.api.models.User import User
from libs.plugins.store.api import defaults
from libs.plugins.store.api.models.Address import Address
from webdjango.models.AbstractModels import DateTimeModel


class OrderStatus:
    # TODO: add more order status

    DRAFT = 'draft'
    UNFULFILLED = 'unfulfilled'
    PARTIALLY_FULFILLED = 'partially fulfilled'
    FULFILLED = 'fulfilled'
    CANCELED = 'canceled'

    CHOICES = [
        (DRAFT, 'Draft'),
        (UNFULFILLED, 'Unfulfilled'),
        (PARTIALLY_FULFILLED, 'Partially fulfilled'),
        (FULFILLED, 'Fulfilled'),
        (CANCELED, 'Canceled')
    ]


class OrderFulfillmentStatus:
    # TODO: maybe add more order fulfillment status

    FULFILLED = 'fulfilled'
    CANCELED = 'canceled'

    CHOICES = [
        (FULFILLED, 'Fulfilled'),
        (CANCELED, 'Canceled')
    ]


class OrderEventTypes:
    PLACED = 'placed'
    PLACED_FROM_DRAFT = 'draft_placed'
    OVERSOLD_ITEMS = 'oversold_items'
    ORDER_MARKED_AS_PAID = 'marked_as_paid'
    CANCELED = 'canceled'
    ORDER_FULLY_PAID = 'order_paid'
    UPDATED = 'updated'

    EMAIL_SENT = 'email_sent'
    SMS_SENT = 'sms_sent'

    PAYMENT_CAPTURED = 'captured'
    PAYMENT_REFUNDED = 'refunded'
    PAYMENT_VOIDED = 'voided'

    FULFILLMENT_CANCELED = 'fulfillment_canceled'
    FULFILLMENT_RESTOCKED_ITEMS = 'restocked_items'
    FULFILLMENT_FULFILLED_ITEMS = 'fulfilled_items'

    TRACKING_UPDATED = 'tracking_updated'

    NOTE_ADDED = 'note_added'

    CHOICES = [
        (PLACED, 'placed'),
        (PLACED_FROM_DRAFT, 'draft_placed'),
        (OVERSOLD_ITEMS, 'oversold_items'),
        (ORDER_MARKED_AS_PAID, 'marked_as_paid'),
        (CANCELED, 'canceled'),
        (ORDER_FULLY_PAID, 'order_paid'),
        (UPDATED, 'updated'),
        (EMAIL_SENT, 'email_sent'),
        (SMS_SENT, 'sms_sent'),
        (PAYMENT_CAPTURED, 'captured'),
        (PAYMENT_REFUNDED, 'refunded'),
        (PAYMENT_VOIDED, 'voided'),
        (FULFILLMENT_CANCELED, 'fulfillment_canceled'),
        (FULFILLMENT_RESTOCKED_ITEMS, 'restocked_items'),
        (FULFILLMENT_FULFILLED_ITEMS, 'fulfilled_items'),
        (TRACKING_UPDATED, 'tracking_updated'),
        (NOTE_ADDED, 'note_added')
    ]


class OrderEventsEmails(Enum):
    ORDER = 'order_confirmation'
    PAYMENT = 'payment_confirmation'
    SHIPPING = 'shipping_confirmation'
    FULFILLMENT = 'fulfillment_confirmation'


EMAIL_CHOICES = {
    OrderEventsEmails.PAYMENT.value: 'Payment confirmation',
    OrderEventsEmails.SHIPPING.value: 'Shipping confirmation',
    OrderEventsEmails.FULFILLMENT.value: 'Fulfillment confirmation',
    OrderEventsEmails.ORDER.value: 'Order confirmation'
}


class OrderLine(models.Model):
    product_name = models.CharField(max_length=256)
    product_sku = models.CharField(max_length=32)
    is_shipping_required = models.BooleanField()

    quantity = models.IntegerField(default=1)
    quantity_fulfilled = models.IntegerField(default=0)

    unit_price_gross = MoneyField(currency=defaults.DEFAULT_CURRENCY,
                                  max_digits=defaults.DEFAULT_MAX_DIGITS,
                                  decimal_places=defaults.DEFAULT_DECIMAL_PLACES)
    unit_price_net = MoneyField(currency=defaults.DEFAULT_CURRENCY,
                                max_digits=defaults.DEFAULT_MAX_DIGITS,
                                decimal_places=defaults.DEFAULT_DECIMAL_PLACES)
    unit_price = TaxedMoneyField(net_field='unit_price_net', gross_field='unit_price_gross')
    tax_rate = models.DecimalField(max_digits=5, decimal_places=2, default=Decimal('0.0'))


    class Meta:
        abstract = True


class OrderEvent(DateTimeModel, models.Model):
    type = models.CharField(max_length=255, choices=OrderEventTypes.CHOICES)
    data = JSONField(blank=True, )  # TODO  make it an embedded model

    class Meta:
        abstract = True


class Order(models.Model):
    order_num = models.CharField(max_length=36, blank=False, null=False, editable=False)
    status = models.CharField(max_length=32, default=OrderStatus.DRAFT, choices=OrderStatus.CHOICES)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    user_email = models.EmailField(blank=True, default='')

    billing_address = models.EmbeddedModelField(model_container=Address, blank=True)
    shipping_address = models.EmbeddedModelField(model_container=Address, blank=True)
