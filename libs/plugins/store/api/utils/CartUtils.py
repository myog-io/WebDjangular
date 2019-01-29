"""
Cart related utility methods.
"""
import sys
import traceback
from datetime import date, timedelta
from uuid import UUID, uuid1

from django.db import transaction
from django.db.models import Q
from rest_framework.exceptions import ValidationError
from rest_framework.serializers import DecimalField

from libs.plugins.store.api import defaults
from webdjango.models.Address import Address, AddressType
from webdjango.serializers.AddressSerializer import AddressSerializer
from webdjango.utils.JsonLogic import jsonLogic

from ..models.Cart import Cart, CartItem, CartStatus, CartTerm
from ..models.Discount import CartRule, RuleValueType
from ..models.Order import Order
from ..serializers.CartSerializer import (CartItemSerializer, CartSerializer,
                                          CartTermSerializer)
from ..serializers.MoneySerializer import MoneyField
from ..serializers.ProductSerializer import (ProductCategorySerializer,
                                             ProductSerializer,
                                             ProductTypeSerializer)
from .DiscountUtils import increase_voucher_usage

money_serializer = MoneyField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                              decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
                              read_only=True)


def get_rule_ammount(price, rule):
    if rule.rule_type == RuleValueType.FIXED:
        value = rule.value
    if rule.rule_type == RuleValueType.PERCENTAGE:
        factor = rule.value / 100
        value = factor * price
    if not value:
        raise NotImplementedError('Unknown rule type')
    return value

# def get_disocunt_rule(price, rule):
#    discount = rule.get_value()
#    gross_after_discount = discount(price)
#    if gross_after_discount.amount < 0:
#        return money_serializer.to_representation(price)
#    return money_serializer.to_representation(gross_after_discount)


def apply_cart_rule(cart, rule):

    # If the value is < 0, is a Discount, first we check if the discount is for specific items or we make the discount on all the cart
    if rule.item_conditions and len(rule.item_conditions) > 0:
        # Let's Give Discount only to the Itens That Meet This Conditions
        rule_does_not_apply = []
        for item in cart.items.all():
            data = {}
            
            data['item'] = CartItemSerializer(item).data
            if item.product:
                data['product'] = ProductSerializer(item.product).data
                data['product_type'] = ProductTypeSerializer(
                    item.product.product_type
                ).data
                if item.product.categories.count() > 0:
                    data['category'] = ProductCategorySerializer(
                        item.product.categories, many=True
                    ).data
            
            try:
                print(rule.item_conditions)
                if jsonLogic(rule.item_conditions, data):
                    if 'discount_rules' in item.data:
                        # TODO: Do we have to update every time? or Just Overhead?
                        if rule.voucher not in item.data['discount_rules']:
                            item.data['discount_rules'][rule.voucher] = money_serializer.to_representation(
                                get_rule_ammount(item.base_price, rule))
                            item.save()
                    else:
                        item.data['discount_rules'] = {
                            rule.voucher: money_serializer.to_representation(get_rule_ammount(item.base_price, rule))
                        }
                        item.save()
                else:
                    if 'discount_rules' in item.data:
                        if rule.voucher in item.data['discount_rules']:
                            # We Need to remove this rule from this product
                            del item.data['discount_rules'][rule.voucher]
                            item.save()
            except:
                traceback.print_tb(sys.exc_info()[2])
                raise
    else:
        value = get_rule_ammount(cart.total, rule)

        item = cart_has_product(cart, rule.voucher)
        if not item:
            parsed_value = money_serializer.to_representation(value)
            item = cart.items.create(quantity=1, data={
                'voucher': rule.voucher,
                'price': parsed_value,
                'name': rule.name,
                'rule_id':  rule.id,
            })

def clean_cart_rule(cart, rule):
    for item in cart.items.all():
        if 'discount_rules' in item.data:
            if rule.voucher in item.data['discount_rules']:
                # This case the line has the rule, so we can only remove the rule
                del item.data['discount_rules'][rule.voucher]
                item.save()
        else:
            item = cart_has_product(cart, rule.voucher)
            if item:
                # This case the line is the rule, so we can remove it
                item.delete()

def apply_all_cart_rules(cart):
    rules = CartRule.objects.active().all()
    for rule in rules:
        if rule.conditions and len(rule.conditions) > 0:
            data = {}
            data['product'] = []
            products = []
            for product in cart.items.all():
                serializer = CartItemSerializer(product)
                products.append(serializer.data)
            data['product'] = products
            data['cart'] = CartSerializer(cart).data
            data['billing_address'] = AddressSerializer(
                cart.billing_address).data
            data['shipping_address'] = AddressSerializer(
                cart.shipping_address).data
            try:
                if jsonLogic(rule.conditions, data):
                    base_price = apply_cart_rule(cart, rule)
                else:
                    clean_cart_rule(cart,rule)
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
    terms = CartTerm.objects.filter(enabled=True, products__in=[item.product for item in cart.items.all()]).exclude(
        id__in=terms_list) | CartTerm.objects.filter(all_carts=True, enabled=True).exclude(id__in=terms_list)
    if terms:
        cart.terms.add(*terms.all())
    
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


def cart_has_product(cart, id_or_sku):
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
    #     for item in cart.items.all():
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

    for item in cart.items.all():
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

    if cart.items.count() > 0:
        for item in cart.items.all():
            pass
    else:

        pass

    # cart.save()
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


def _get_order_number(cart):
    import datetime
    now = datetime.datetime.now()
    last_order = Order.objects.all().order_by('id').last()
    if last_order:
        last_id = last_order.id
    else:
        last_id = 1
    return '{0}{1}{2}-{3}-{4}'.format(now.year, now.month, now.day, cart.id, last_id)


def _process_voucher_data_for_order(cart):
    # The Vouchers are automatic added to the Cart as Cart Lines, so we can search for them this way!
    for item in cart.items.all():
        if 'discount_rules' in item.data:

            for key in item.data:
                voucher = CartRule.objects.filter(voucher=key).first()
                if voucher:
                    increase_voucher_usage(voucher)
        elif 'voucher' in item.data:
            voucher = CartRule.objects.filter(
                voucher=item.data['voucher']).first()
            if voucher:
                increase_voucher_usage(voucher)

    return {
        'order_num': _get_order_number(cart),
        'discount_amount': cart.discount(),
    }


def _process_shipping_data_for_order(cart):
    """Fetch, process and return shipping data from cart."""
    if not cart.is_shipping_required:
        return {}

    shipping_address = cart.shipping_address

    if cart.user:
        if cart.shipping_address:
            store_user_address(
                cart.user, cart.shipping_address, AddressType.SHIPPING)

    return {
        'shipping_address': AddressSerializer(cart.billing_address).data,
        # 'shipping_method': cart.shipping_method,
        # 'shipping_method_name': smart_text(cart.shipping_method),
        'shipping_price': cart.shipping_price,
        'weight': cart.total_weight
    }


def _process_user_data_for_order(cart, request):
    """Fetch, process and return shipping data from cart."""
    billing_address = cart.billing_address

    if cart.user:
        store_user_address(cart.user, billing_address, AddressType.BILLING)

    return {
        'user': cart.user,
        'user_email': cart.user.email if cart.user else cart.email,
        'customer_note': cart.note,
        'billing_address': AddressSerializer(billing_address).data,
        'extra_data': cart.extra_data,
        'security_data': {
            'HTTP_USER_AGENT': request.META.get('HTTP_USER_AGENT'),
            'REMOTE_ADDR': request.META.get('REMOTE_ADDR')
        }
    }


def _process_terms_data_for_order(cart):
    return {
        'terms': CartTermSerializer(cart.terms, many=True).data
    }


def add_item_to_order(order, item):
    """Add total_quantity of variant to order.
    Returns an order line the variant was added to.
    By default, raises InsufficientStock exception if  quantity could not be
    fulfilled.
    """
    line = order.lines.create(
        product_name=item.name,
        product_sku=item.sku,
        is_shipping_required=item.is_shipping_required,
        quantity=item.quantity,
        quantity_fulfilled=0,
        unit_cost=item.cost,
        unit_base_price=item.base_price,
        unit_price=item.price,
        tax_rate='0.0',  # TODO: Get Correct Tax Rate
    )
    # TODO: Alocate Stock
    # if item.product and item.product.track_inventory:
    # allocate_stock(variant, quantity)
    return line


def _fill_order_with_cart_data(order, cart):
    """Fill an order with data (variants, note) from cart."""
    for line in cart.items.all():
        add_item_to_order(order, line)

    # TODO: Run Payment Rotine and We will only allow Cart Creation if the Payment Routine goes Good?!
    # cart.payments.update(order=order)


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
        order_data = _process_voucher_data_for_order(cart)
        order_data.update(_process_shipping_data_for_order(cart))
        order_data.update(_process_user_data_for_order(cart, request))
        order_data.update(_process_terms_data_for_order(cart))
        order_data.update({
            'total': cart.total,
            'subtotal': cart.subtotal,
            'taxes': cart.taxes

        })
        order = Order.objects.create(**order_data)

        _fill_order_with_cart_data(order, cart)
        return order


def ready_to_place_order(cart: Cart):
    if cart.is_shipping_required:
        if cart.items.count() <= 0:
            raise ValidationError('No itens in cart')
        if not cart.shipping_method:
            raise ValidationError('Shipping method is not set')
        if not cart.shipping_address:
            raise ValidationError('Shipping address is not set')
        # if not is_valid_shipping_method(cart):
        #    raise ValidationError('Shipping method is not valid for your shipping address')
        if not cart.billing_address:
            raise ValidationError('Billing address is not set')
    return True
