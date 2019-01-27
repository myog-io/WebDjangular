from uuid import uuid4

from django.db import models
from django_mysql.models import JSONField

from libs.core.users.api.models.User import User
from libs.plugins.store.api.models.Product import Product
from webdjango.models.AbstractModels import BaseModel
from webdjango.models.Address import Address
from ..serializers.MoneySerializer import MoneyField
from libs.plugins.store.api import defaults
from ..utils.Taxes import ZERO_MONEY, ZERO_TAXED_MONEY
from prices import Money
money_serializer = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS, decimal_places=defaults.DEFAULT_DECIMAL_PLACES, read_only=True)

class CartStatus:
    ABANDONED = 'abandoned'
    ACTIVE = 'active'

    CHOICES = [
        (ABANDONED, 'abandoned'),
        (ACTIVE, 'active'),
    ]


class Cart(BaseModel):
    """
    """

    # When user is null, it is a guest (not logged in user)
    user = models.ForeignKey(User, on_delete=None,
                             blank=True, null=True, related_name='user')

    token = models.UUIDField(default=uuid4, editable=False)
    total_quantity = models.PositiveIntegerField(default=0)
    status = models.CharField(
        max_length=16, choices=CartStatus.CHOICES, default=CartStatus.ACTIVE)
    extra_data = JSONField(blank=True)
    billing_address = models.ForeignKey(
        Address, related_name='cart_billing_address', on_delete=models.CASCADE, blank=True, null=True)
    shipping_address = models.ForeignKey(
        Address, related_name='cart_shipping_address', on_delete=models.CASCADE, blank=True, null=True)

    #shipping_method = models.ForeignKey(ShippingMethod,
    #                                    blank=True, null=True, related_name='carts',
    #                                    on_delete=models.SET_NULL)

    note = models.TextField(blank=True, default='')

    #  discount_amount = MoneyField(currency=defaults.DEFAULT_CURRENCY,
    #                             max_digits=defaults.DEFAULT_MAX_DIGITS,
    #                             decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
    #                             default=zero_money)
    #  discount_name = models.CharField(max_length=255, blank=True, null=True)

    #  voucher_code = models.CharField(max_length=12, blank=True, null=True)

    class Meta:
        ordering = ['-pk']

    @property
    def is_shipping_required(self):
        """
        Return True if any of the items requires shipping.
        """
        return any(line.is_shipping_required for line in self.items.all())
        

    @property
    def shipping_price(self):
        # TODO: get shipping price based on shipping method selected
        return ZERO_MONEY

    @property
    def taxes(self):
        return ZERO_MONEY

    @property
    def fees(self):
        fees = (line.total if line.total > ZERO_MONEY else ZERO_MONEY for line in self.items.filter(product=None).all())
        return sum(fees, ZERO_MONEY)

    @property
    def subtotal(self):
        """
        Return the subtotal of the cart.
        """
        # TODO: get the subtotal (sum of the items * qty )
        subtotals = (line.total for line in self.items.exclude(product=None).all())
        return sum(subtotals, ZERO_MONEY)
        

    @property
    def total(self):
        """
        Return the Total
        :return:
        """
        # TODO: get the subtotal + shippiment cost + taxes
        return self.subtotal + self.shipping_price + self.taxes + self.fees
        

    @property
    def get_total_weight(self):
        """
        Return the total weight
        :return:
        """
        # weights = Weight(kg=0)
        # for line in self:
        #     weights += line.variant.get_weight() * line.quantity
        # return weights
        return 0


class CartItem(models.Model):
    cart = models.ForeignKey(
        'Cart', related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(
        Product, on_delete=None, related_name='product', null=True)
    quantity = models.PositiveIntegerField(default=1)
    data = JSONField(blank=True)

    class Meta:
        ordering = ['-pk']
    
    @property
    def name(self):
        if self.product:
            return self.product.name
        return self.data['name']

    @property
    def base_price(self):
        if self.product:
            return self.product.price
        return Money(self.data['price'], defaults.DEFAULT_CURRENCY)
    @property
    def price(self):
        price = self.base_price
        if 'discount_rules' in self.data:
            for discount_code in self.data['discount_rules']:
                if discount_code in self.data['discount_rules']:
                    price = price + Money(self.data['discount_rules'][discount_code], defaults.DEFAULT_CURRENCY)
        # Let's Check the Rules
        return price

    @property
    def discount(self):
        return self.price - self.base_price

    @property
    def total(self):
        """
        Return the total price of this item.
        """
        # TODO: get the product final price (after the rules/discounts) and multiple by the quantity
        total = self.quantity * self.price
        return total
    
    @property
    def is_shipping_required(self):
        """
        Return True if any of the items requires shipping.
        """
        return self.product.is_shipping_required

    @property
    def sku(self):
        if self.product:
            return self.product.sku
        return self.data['voucher']
        


