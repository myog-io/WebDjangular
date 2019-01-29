from decimal import Decimal
from django_mysql.models import JSONField
from django.core.validators import MinValueValidator
from django.db import models
from django.utils.timezone import now
from django_prices.models import MoneyField, TaxedMoneyField
from libs.plugins.store.api import defaults
from libs.plugins.store.api.models.Payment import ChargeStatus
from libs.core.users.api.models.User import User
from webdjango.models.AbstractModels import BaseModel
from webdjango.models.Address import Address
from ..utils.Taxes import ZERO_MONEY, ZERO_TAXED_MONEY
from prices import Money
from enum import Enum
from libs.plugins.store.api import defaults


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


class FulfillmentLine(BaseModel):
    """ TODO:
    I don't know, order_line does not have ID, maybe a list of product ids/sku
    Since one Fulfillment line can have multiples order lines and vice versa. I can not embedded one inside the other
    """
    # order_line / product_ids = ArrayReferenceSerializer(to=ProductCategory)

    quantity = models.IntegerField(validators=[MinValueValidator(1)])

    class Meta:
        abstract = True


class Fulfillment(BaseModel):
    fulfillment_num = models.PositiveIntegerField(editable=False)
    status = models.CharField(max_length=32, default=OrderFulfillmentStatus.FULFILLED,
                              choices=OrderFulfillmentStatus.CHOICES)
    tracking_number = models.CharField(max_length=255, default='', blank=True)
    shipping_date = models.DateTimeField(default=now, editable=False)

    #fulfillment_lines = models.ArrayModelField(model_container=FulfillmentLine)

    class Meta:
        abstract = True


class OrderLine(BaseModel):
    product_name = models.CharField(max_length=256)
    product_sku = models.CharField(max_length=32)
    is_shipping_required = models.BooleanField()

    quantity = models.IntegerField(default=1)
    quantity_fulfilled = models.IntegerField(default=0)

    unit_cost = MoneyField(
        'cost', currency=defaults.DEFAULT_CURRENCY, max_digits=defaults.DEFAULT_MAX_DIGITS,
        decimal_places=defaults.DEFAULT_DECIMAL_PLACES, blank=True, null=True)
    unit_base_price = MoneyField(
        'list', currency=defaults.DEFAULT_CURRENCY, max_digits=defaults.DEFAULT_MAX_DIGITS,
        decimal_places=defaults.DEFAULT_DECIMAL_PLACES)
    unit_price = MoneyField(
        'sale', currency=defaults.DEFAULT_CURRENCY, max_digits=defaults.DEFAULT_MAX_DIGITS,
        decimal_places=defaults.DEFAULT_DECIMAL_PLACES, blank=True, null=True)
    total = MoneyField(
        'total', currency=defaults.DEFAULT_CURRENCY, max_digits=defaults.DEFAULT_MAX_DIGITS,
        decimal_places=defaults.DEFAULT_DECIMAL_PLACES, blank=True, null=True  
    )
    tax_rate = models.DecimalField(max_digits=5, decimal_places=2, default=Decimal('0.0'))

    class Meta:
        abstract = True


class OrderEvent(BaseModel):
    event_type = models.CharField(max_length=255, choices=OrderEventTypes.CHOICES)
    data = JSONField(blank=True)
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL, related_name='+')
    order = models.ForeignKey('Order', related_name='events', on_delete=models.CASCADE)
    class Meta:
        ordering = ('date', )


class OrderQueryset(models.QuerySet):
    def confirmed(self):
        """
        Return all orders confirmed, which are non-draft orders.
        """
        return self.exclude(status=OrderStatus.DRAFT)

    def drafts(self):
        """
        Return all draft orders.
        """
        return self.filter(status=OrderStatus.DRAFT)

        # def ready_to_fulfill(self):
        """
        Return orders that are ready to fulfill which are fully paid but unfulfilled or partially fulfilled.
        """
        # statuses = {OrderStatus.UNFULFILLED, OrderStatus.PARTIALLY_FULFILLED}
        # qs = self.filter(status__in=statuses, payments__is_active=True)
        # qs = qs.annotate(amount_paid=Sum('payments__captured_amount'))
        # return qs.filter(total_gross__lte=F('amount_paid'))

    def ready_to_capture(self):
        """
        Return orders with payments in progress.
        Orders ready to capture are those which are not draft or canceled and
        have a preauthorized payment.
        """
        qs = self.filter(payments__is_active=True, payments__charge_status__in=[ChargeStatus.NOT_CHARGED,
                                                                                ChargeStatus.CHARGED])
        qs = qs.exclude(status={OrderStatus.DRAFT, OrderStatus.CANCELED})
        return qs.distinct()

class Order(BaseModel):
    order_num = models.CharField(max_length=100, blank=False, null=False, editable=False)
    status = models.CharField(max_length=32, default=OrderStatus.DRAFT, choices=OrderStatus.CHOICES)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='order')
    user_email = models.EmailField(blank=True, default='', editable=False)
    extra_data = JSONField(blank=True)
    security_data = JSONField(blank=True)
    extra_payment_data = JSONField(blank=True)
    billing_address = JSONField(blank=True,editable=False)
    shipping_address = JSONField(blank=True,editable=False)
    terms = JSONField(blank=True,editable=False)
    # shipping_method = models.ForeignKey(
    #     ShippingMethod, blank=True, null=True, related_name='orders',
    #     on_delete=models.SET_NULL)
    shipping_price = MoneyField(
        currency=defaults.DEFAULT_CURRENCY,
        max_digits=defaults.DEFAULT_MAX_DIGITS,
        decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
        blank=True, null=True, editable=False)
    
    shipping_method_name = models.CharField(
        max_length=255, null=True, default=None, blank=True, editable=False)
    token = models.CharField(max_length=36, unique=True, blank=True)

    taxes = MoneyField(
        currency=defaults.DEFAULT_CURRENCY,
        max_digits=defaults.DEFAULT_MAX_DIGITS,
        decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
        blank=True, null=True, editable=False)

    sub_total = MoneyField(
        currency=defaults.DEFAULT_CURRENCY,
        max_digits=defaults.DEFAULT_MAX_DIGITS,
        decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
        blank=True, null=True, editable=False)
    total = MoneyField(
        currency=defaults.DEFAULT_CURRENCY,
        max_digits=defaults.DEFAULT_MAX_DIGITS,
        decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
        blank=True, null=True, editable=False)
  
    discount_amount = MoneyField(currency=defaults.DEFAULT_CURRENCY,
                                 max_digits=defaults.DEFAULT_MAX_DIGITS,
                                 decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
                                 blank=True, null=True, editable=False)
    customer_note = models.TextField(blank=True, default='')
    # TODO: idk... maybe a better way to store those fields instead of "flat"
    class Meta:
        ordering = ['-created']
