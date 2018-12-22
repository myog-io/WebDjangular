from uuid import uuid4

from django.db import models
from django.contrib.postgres.fields import JSONField

from libs.core.users.api.models.User import User
from libs.plugins.store.api.models.Product import Product
from webdjango.models.AbstractModels import BaseModel
from webdjango.models.Address import Address


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

    billing_address = models.ForeignKey(
        Address, related_name='cart_billing_address', on_delete=models.CASCADE, blank=True, null=True)
    shipping_address = models.ForeignKey(
        Address, related_name='cart_shipping_address', on_delete=models.CASCADE, blank=True, null=True)

    # shipping_method = models.ForeignKey(ShippingMethod,
    #                                    blank=True, null=True, related_name='carts',
    #                                    on_delete=models.SET_NULL)

    #  note = models.TextField(blank=True, default='')

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
        # TODO: return any(line.is_shipping_required() for line in self)
        return False

    @property
    def get_shipping_price(self):
        # TODO: get shipping price based on shipping method selected
        return False

    @property
    def get_subtotal(self, discounts=None, taxes=None):
        """
        Return the subtotal of the cart.
        """
        # TODO: get the subtotal (sum of the items * qty )
        # subtotals = (line.get_total(discounts, taxes) for line in self)
        # return sum(subtotals, ZERO_TAXED_MONEY)
        return False

    @property
    def get_total(self):
        """
        Return the Total
        :return:
        """
        # TODO: get the subtotal + shippiment cost + taxes
        return False

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
    product = models.ForeignKey(
        Product, on_delete=None, related_name='product')
    quantity = models.PositiveIntegerField(default=1)
    data = JSONField(blank=True, default=dict)
    cart = models.ForeignKey(
        'Cart', related_name='items', on_delete=models.CASCADE)

    @property
    def get_total(self, discounts=None, taxes=None):
        """
        Return the total price of this item.
        """
        # TODO: get the product final price (after the rules/discounts) and multiple by the quantity
        #total = self.quantity * self.product.get_final_price()
        total = 0
        return total

    @property
    def is_shipping_required(self):
        """
        Return True if any of the items requires shipping.
        """
        # TODO: self.product.is_shipping_required()
        return False
