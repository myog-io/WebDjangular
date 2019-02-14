from decimal import Decimal
from enum import Enum

from django.core.validators import MinValueValidator
from django.db import models
from django.utils.timezone import now
from django_mysql.models import JSONField
from django_prices.models import MoneyField
from prices import Money

from libs.core.users.api.models.User import User
from libs.plugins.store.api import defaults
from libs.plugins.store.api.models.Product import Product
from libs.plugins.store.api.models.Payment import ChargeStatus
from webdjango.models.AbstractModels import BaseModel
from webdjango.models.Address import Address
from webdjango.models.Core import Website
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

    # fulfillment_lines = models.ArrayModelField(model_container=FulfillmentLine)

    class Meta:
        abstract = True


class OrderLine(BaseModel):

    product_name = models.CharField(max_length=256)
    product_sku = models.CharField(max_length=32)
    
    is_shipping_required = models.BooleanField()
    product = models.ForeignKey(
        Product, on_delete=None, related_name='order_line', null=True)
    quantity = models.IntegerField(default=1)
    quantity_fulfilled = models.IntegerField(default=0)
    data = JSONField(blank=True)

    unit_cost = MoneyField(
        'cost', currency=defaults.DEFAULT_CURRENCY, max_digits=defaults.DEFAULT_MAX_DIGITS,
        decimal_places=defaults.DEFAULT_DECIMAL_PLACES, blank=True, null=True)
    unit_base_price = MoneyField(
        'list', currency=defaults.DEFAULT_CURRENCY, max_digits=defaults.DEFAULT_MAX_DIGITS,
        decimal_places=defaults.DEFAULT_DECIMAL_PLACES)
    unit_price = MoneyField(
        'sale', currency=defaults.DEFAULT_CURRENCY, max_digits=defaults.DEFAULT_MAX_DIGITS,
        decimal_places=defaults.DEFAULT_DECIMAL_PLACES, blank=True, null=True)

    tax_rate = models.DecimalField(max_digits=5, decimal_places=2, default=Decimal('0.0'))
    order = models.ForeignKey(
        'Order', related_name='lines', editable=False, on_delete=models.CASCADE)

    class Meta:
        ordering = ('pk',)

    def __str__(self):
        if hasattr(self.product_data, 'name'):
            return self.product_data['name']
        if hasattr(self.product_data, 'sku'):
            return self.product_data['sku']

        return 'no product'

    def get_total(self):
        return self.unit_price * self.quantity

    @property
    def quantity_unfulfilled(self):
        return self.quantity - self.quantity_fulfilled


class OrderEvent(BaseModel):
    event_type = models.CharField(max_length=255, choices=OrderEventTypes.CHOICES)
    data = JSONField(blank=True)
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL, related_name='+')
    order = models.ForeignKey('Order', related_name='events', on_delete=models.CASCADE)

    class Meta:
        ordering = ('created',)


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
    user = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='order', default=None, null=True, editable=False)
    website = models.ForeignKey(Website, on_delete=models.SET , related_name='order', default=1)
    user_email = models.EmailField(blank=True, default='', editable=False)
    extra_data = JSONField(blank=True)
    security_data = JSONField(blank=True)
    extra_payment_data = JSONField(blank=True)
    billing_address = JSONField(blank=True, editable=False)
    shipping_address = JSONField(blank=True, editable=False)
    terms = JSONField(blank=True, editable=False)
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

    taxes = MoneyField(
        currency=defaults.DEFAULT_CURRENCY,
        max_digits=defaults.DEFAULT_MAX_DIGITS,
        decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
        blank=True, null=True, editable=False)

    subtotal = MoneyField(
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

    def is_fully_paid(self):
        total_paid = self._total_paid()
        return total_paid.gross >= self.total.gross

    def is_partly_paid(self):
        total_paid = self._total_paid()
        return total_paid.gross.amount > 0

    def get_user_current_email(self):
        return self.user and self.user.email or self.user_email

    def _total_paid(self):
        payments = self.payments.filter(
            charge_status=ChargeStatus.CHARGED)
        total_captured = [
            payment.get_captured_amount() for payment in payments]
        total_paid = sum(total_captured, ZERO_TAXED_MONEY)
        return total_paid

    def _index_billing_phone(self):
        return self.billing_address.phone

    def _index_shipping_phone(self):
        return self.shipping_address.phone

    def __repr__(self):
        return '<Order #%r>' % (self.id,)

    def __str__(self):
        return '#%d' % (self.id,)

    def get_absolute_url(self):
        # TODO: Return the correct Frontend order link
        return "ORDER_LINK"
        # return reverse('order:details', kwargs={'token': self.token})

    def get_last_payment(self):
        return max(self.payments.all(), default=None, key=attrgetter('pk'))

    def get_payment_status(self):
        last_payment = self.get_last_payment()
        if last_payment:
            return last_payment.charge_status
        return ChargeStatus.NOT_CHARGED

    def get_payment_status_display(self):
        last_payment = self.get_last_payment()
        if last_payment:
            return last_payment.get_charge_status_display()
        return dict(ChargeStatus.CHOICES).get(ChargeStatus.NOT_CHARGED)

    def is_pre_authorized(self):
        return self.payments.filter(
            is_active=True,
            transactions__kind=TransactionKind.AUTH).filter(
            transactions__is_success=True).exists()

    @property
    def quantity_fulfilled(self):
        return sum([line.quantity_fulfilled for line in self])

    def is_shipping_required(self):
        return any(line.is_shipping_required for line in self)

    def get_subtotal(self):
        subtotal_iterator = (line.get_total() for line in self)
        return sum(subtotal_iterator, ZERO_TAXED_MONEY)

    def get_total_quantity(self):
        return sum([line.quantity for line in self])

    def is_draft(self):
        return self.status == OrderStatus.DRAFT

    def is_open(self):
        statuses = {OrderStatus.UNFULFILLED, OrderStatus.PARTIALLY_FULFILLED}
        return self.status in statuses

    def can_cancel(self):
        return self.status not in {OrderStatus.CANCELED, OrderStatus.DRAFT}

    def can_capture(self, payment=None):
        if not payment:
            payment = self.get_last_payment()
        if not payment:
            return False
        order_status_ok = self.status not in {
            OrderStatus.DRAFT, OrderStatus.CANCELED}
        return payment.can_capture() and order_status_ok

    def can_charge(self, payment=None):
        if not payment:
            payment = self.get_last_payment()
        if not payment:
            return False
        order_status_ok = self.status not in {
            OrderStatus.DRAFT, OrderStatus.CANCELED}
        return payment.can_charge() and order_status_ok

    def can_void(self, payment=None):
        if not payment:
            payment = self.get_last_payment()
        if not payment:
            return False
        return payment.can_void()

    def can_refund(self, payment=None):
        if not payment:
            payment = self.get_last_payment()
        if not payment:
            return False
        return payment.can_refund()

    def can_mark_as_paid(self):
        return len(self.payments.all()) == 0

    @property
    def total_authorized(self):
        payment = self.get_last_payment()
        if payment:
            return payment.get_authorized_amount()
        return zero_money()

    @property
    def total_captured(self):
        payment = self.get_last_payment()
        if payment and payment.charge_status == ChargeStatus.CHARGED:
            return Money(payment.captured_amount, payment.currency)
        return zero_money()

    @property
    def total_balance(self):
        return self.total_captured - self.total.gross

    def get_total_weight(self):
        # Cannot use `sum` as it parses an empty Weight to an int
        weights = Weight(kg=0)
        for line in self:
            weights += line.variant.get_weight() * line.quantity
        return weights
