"""
Cart related utility methods.
"""
import sys
import traceback
from uuid import UUID, uuid1
from datetime import date, timedelta

from ..models.Cart import Cart, CartItem, CartStatus
from ..models.Discount import CartRule, RuleValueType
from rest_framework.serializers import DecimalField
from libs.plugins.store.api import defaults
from ..serializers.MoneySerializer import MoneyField
from webdjango.utils.JsonLogic import jsonLogic
from ..serializers.CartSerializer import CartItemSerializer, CartSerializer
from webdjango.serializers.AddressSerializer import AddressSerializer

money_serializer = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS, decimal_places=defaults.DEFAULT_DECIMAL_PLACES, read_only=True)

def get_rule_ammount(price, rule):
    if rule.rule_type == RuleValueType.FIXED:
        value = rule.value
    if rule.rule_type == RuleValueType.PERCENTAGE:
        factor = Decimal(rule.value) / 100
        value = factor * price
    if not value:
        raise NotImplementedError('Unknown rule type')
    return value

#def get_disocunt_rule(price, rule):
#    discount = rule.get_value()
#    gross_after_discount = discount(price)
#    if gross_after_discount.amount < 0:
#        return money_serializer.to_representation(price)
#    return money_serializer.to_representation(gross_after_discount)

def apply_cart_rule(cart, rule):
    
    # If the value is < 0, is a Discount, first we check if the discount is for specific items or we make the discount on all the cart  
    if rule.item_conditions and len(rule.item_conditions) > 0:
        # Let's Give Discount only to the Itens That Meet This Conditions
        for product in cart.items.all():
            data = {}
            serializer = CartItemSerializer(product)
            data['product'] = serializer.data
            # TODO: ADD PRODUCT CATEGORY AS WELL
            try:
                if jsonLogic(rule.item_conditions, data):
                    if 'discount_rules' in product.data:
                        # TODO: Do we have to update every time? or Just Overhead?
                        if rule.voucher not in product.data['discount_rules']:
                            product.data['discount_rules'][rule.voucher] =  money_serializer.to_representation(get_rule_ammount(product.base_price, rule))
                            product.save()
                    else:
                        product.data['discount_rules'] = {
                            rule.voucher: money_serializer.to_representation(get_rule_ammount(product.base_price, rule))
                        }
                        product.save()   
            except:
                traceback.print_tb(sys.exc_info()[2])
                raise
    else:
        value = get_rule_ammount(cart.total,rule)

        item = cart_has_product(cart,rule.voucher)
        if not item:
            parsed_value = money_serializer.to_representation(value)
            item = cart.items.create(quantity=1,data={
                'voucher': rule.voucher,
                'price': parsed_value,
                'name': rule.name,
                'rule_id':  rule.id,
            })

    


def apply_all_cart_rules(cart):
    if not cart.id: return
    rules = CartRule.objects.active().all()
    for rule in rules:
        if rule.conditions and len(rule.conditions) > 0:
            data = {}
            data['product'] = []
            products = [];
            for product in cart.items.all():
                serializer = CartItemSerializer(product)
                products.append(serializer.data)
            data['product'] = products
            data['cart'] = CartSerializer(cart).data
            data['billing_address'] =  AddressSerializer(cart.billing_address).data
            data['shipping_address'] =  AddressSerializer(cart.shipping_address).data
            try:
                if jsonLogic(rule.conditions, data):
                    base_price = apply_cart_rule(cart, rule)
            except:
                traceback.print_tb(sys.exc_info()[2])
                raise
            # apply Rule
        else:
            apply_cart_rule(cart, rule)
            # apply rule

    return cart

def token_is_valid(token):
    """Validate a cart token."""
    if token is None:
        return False
    if isinstance(token, UUID):
        return True
    try:
        UUID(token)
    except ValueError:
        return False
    return True

def cart_has_product(cart,id_or_sku):
    if cart.items.count() > 0 and id_or_sku is not None:
        for item in cart.items.all():
            if item.product:
                if item.product.id is id_or_sku or item.product.sku is id_or_sku:
                    return item
            if 'voucher' in item.data and item.data['voucher'] == id_or_sku:
                return item
    return None



def contains_unavailable_products(cart):
    """
    :param cart:
    :return: True if cart contains any unavailable item, False otherwise
    """

    # TODO: check if cart contains any unavailable item
    # try:
    #     for item in cart.items:
    #         item.check_quantity(item.quantity)
    # except InsufficientStock:
    #     return True
    # return False
    return False


def remove_unavailable_products(cart):
    """
    :param cart:
    :return: return the quantity of items removed
    """

    for item in cart.items:
        pass
        # TODO: if cart contains any unavailable item, decrease the quantity until it is available, otherwise remove it
    return 0


def assign_guest_cart(user, token):
    """
    Assign the guest cart to the user that logged in.
    param user: the user that just logged in
    param token: the token cart
    :return: return the cart. If the user already had a cart the guest cart will append to it. In case of the same
    item, it won't increase the quantity, it will use the bigger quantity.
    """
    # TODO: do what I just wrote above.
    return False


def get_guest_cart_from_token(token):
    """
    :param token:
    :return: return the cart if exists, False otherwise
    """

    return Cart.objects.filter(token=token, status=CartStatus.ACTIVE).first()


def get_user_cart(user):
    """
    :param user:
    :return: return the last active cart from the user if exists, False otherwise
    """
    # return cart_queryset.filter(user=user).first()


def add_item_to_cart(cart, cart_item):

    if len(cart.items) > 0:
        for item in cart.items:
            pass
    else:

        pass

    #cart.save()
    return cart





















