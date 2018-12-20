"""
Cart related utility methods.
"""
from uuid import UUID, uuid1
from datetime import date, timedelta

from djongo.models import ObjectIdField

from libs.plugins.store.api.models.Cart import Cart, CartItem, CartStatus


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


def get_or_create_cart(request):
    """
    Fetch the cart from database if exists, create it otherwise.
    """

    token = request.query_params.get('token')
    token_is_valid(token)

    user = False  # TODO: get or create the cart if the user is logged in
    if user:
        cart = None
    else:
        cart = get_guest_cart_from_token(token)

    if cart is None:
        cart = Cart.objects.create(
            token=uuid1(),
            items=[]
        )
    return cart

    # cart_queryset = Cart.objects.all()
#
# token = uuid1()
#
# cart = cart_queryset.filter(token=token, user=None).get_or_create(
#     user=None,
#     items=[]
# )


# if request.user.is_authenticated:
#    return get_or_create_user_cart(request.user, cart_queryset)
# return get_or_create_anonymous_cart_from_token(token, cart_queryset)


def add_item_to_cart(cart, cart_item):

    if len(cart.items) > 0:
        for item in cart.items:
            pass
    else:
        #Cart.objects.mongo_update({"_id": cart.pk},
        #                         {"$push": {"items": {
        #                             "product": ObjectIdField(cart_item['product']['id']),
        #                             "quantity": cart_item['quantity']
        #                         }}})

        Cart.objects.mongo_update({"_id": cart.pk}, {"$push": {"items": cart_item}})


        pass

    # Cart.objects.mongo_insert_one()

    #cart.save()
    return cart





















