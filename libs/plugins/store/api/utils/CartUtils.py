"""
Cart related utility methods.
"""
import sys
import traceback
from uuid import UUID, uuid1
from datetime import date, timedelta

from ..models.Cart import Cart, CartItem, CartStatus, CartTerm
from ..models.Discount import CartRule, RuleValueType
from rest_framework.serializers import DecimalField
from libs.plugins.store.api import defaults
from ..serializers.MoneySerializer import MoneyField
from webdjango.utils.JsonLogic import jsonLogic
from ..serializers.CartSerializer import CartItemSerializer, CartSerializer
from webdjango.serializers.AddressSerializer import AddressSerializer
from webdjango.models.Address import AddressType, Address
from django.db.models import Q
from django.db import transaction
from .DiscountUtils import increase_voucher_usage

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
            data['billing_address'] = AddressSerializer(cart.billing_address).data
            data['shipping_address'] = AddressSerializer(cart.shipping_address).data
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

def apply_cart_terms(cart):
    # Search for Terms that Should be applied to all carts
    terms_list = [o.id for o in cart.terms.all()]
    terms = CartTerm.objects.filter(enabled=True,products__in=[item.product for item in cart.items.all()]).exclude(id__in=terms_list) | CartTerm.objects.filter(all_carts=True,enabled=True).exclude(id__in=terms_list)
    if terms:
        cart.terms.add(*terms.all())
    # Loop The itens and check if any product has

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
    
def store_user_address(user, address, address_type):
    """Add address to user address book and set as default one."""
    address, _ = user.addresses.get_or_create(**address.as_data())

    if address_type == AddressType.BILLING:
        if not user.default_billing_address:
            user.default_billing_address = address
            user.save(update_fields=['default_billing_address'])
    elif address_type == AddressType.SHIPPING:
        if not user.default_shipping_address:
            user.default_shipping_address = address
            user.save(update_fields=['default_shipping_address'])


def _get_oder_number(cart):
    import datetime
    now = datetime.datetime.now()
    last_order = Order.objects.all().order_by('id').last()
    if not last_order:
        last_id = 1
    else:
        last_id = last_order.id
    return '{0}{1}{2}-{3}-{4}'.format(now.year, now.month, now.day, cart.user.id, last_id)

def _process_voucher_data_for_order(cart):
    # The Vouchers are automatic added to the Cart as Cart Lines, so we can search for them this way!
    for item in cart:
        if 'discount_rules' in item.data:
            for key, value in item.data:
                voucher = CartRule.get(voucher=key)
                if voucher:
                    increase_voucher_usage(voucher)
        elif 'voucher' in item.data:
            voucher = CartRule.get(voucher=item.data['voucher'])
            if voucher:
                increase_voucher_usage(voucher)
    return {
        'order_num': _get_order_number(cart),
        'discount_amount': cart.discount,
    }

def _process_shipping_data_for_order(cart, taxes):
    """Fetch, process and return shipping data from cart."""
    if not cart.is_shipping_required():
        return {}

    shipping_address = cart.shipping_address

    if cart.user:
        if cart.shipping_address:
            store_user_address(cart.user, cart.shipping_address, AddressType.SHIPPING)
    
    return {
        'shipping_address': AddressSerializer(cart.billing_address).data,
        #'shipping_method': cart.shipping_method,
        #'shipping_method_name': smart_text(cart.shipping_method),
        #'shipping_price': cart.get_shipping_price(taxes),
        #'weight': cart.get_total_weight()
    }
    

def _process_user_data_for_order(cart, request):
    """Fetch, process and return shipping data from cart."""
    billing_address = cart.billing_address

    if cart.user:
        store_user_address(cart.user, billing_address, AddressType.BILLING)
        
    return {
        'user': cart.user,
        'user_email': cart.user.email,
        'billing_address': AddressSerializer(billing_address).data,
        'security_data': {
            'HTTP_USER_AGENT':request.META.get('HTTP_USER_AGENT'),
            'REMOTE_ADDR':request.META.get('REMOTE_ADDR')
        }
    }


def _fill_order_with_cart_data(order, cart, discounts, taxes):
    """Fill an order with data (variants, note) from cart."""
    from ..order.utils import add_variant_to_order

    for line in cart:
        add_variant_to_order(
            order, line.variant, line.quantity, discounts, taxes)

    cart.payments.update(order=order)

    if cart.note:
        order.customer_note = cart.note
        order.save(update_fields=['customer_note'])


@transaction.atomic
def create_order(cart, request):
    """Create an order from the cart.
    Each order will get a private copy of both the billing and the shipping
    address (if shipping).
    If any of the addresses is new and the user is logged in the address
    will also get saved to that user's address book.
    Current user's language is saved in the order so we can later determine
    which language to use when sending email.
    """
    if ready_to_place_order(cart):
        try:
            order_data = _process_voucher_data_for_order(cart)
        except NotApplicable:
            return None

        order_data.update(_process_shipping_data_for_order(cart, taxes))
        order_data.update(_process_user_data_for_order(cart, request))
        order_data.update({
            'total': cart.get_total(discounts, taxes)
        })

        order = Order.objects.create(**order_data)

        _fill_order_with_cart_data(order, cart, discounts, taxes)
        return order


def is_fully_paid(cart: Cart):
    payments = cart.payments.filter(is_active=True)
    total_paid = sum(
        [p.total for p in payments])
    return total_paid >= cart.get_total().gross.amount


def ready_to_place_order(cart: Cart, taxes, discounts):
    if cart.is_shipping_required():
        if not cart.shipping_method:
            return False, pgettext_lazy(
                'order placement_error', 'Shipping method is not set')
        if not cart.shipping_address:
            return False, pgettext_lazy(
                'order placement error', 'Shipping address is not set')
        if not is_valid_shipping_method(cart):
            return False, pgettext_lazy(
                'order placement error',
                'Shipping method is not valid for your shipping address')
        if not cart.billing_address:
            return False, pgettext_lazy(
                'order placement error', 'Billing address is not set')
    if not is_fully_paid(cart):
        return False, pgettext_lazy(
            'order placement error', 'Checkout is not fully paid')
    return True, None
















