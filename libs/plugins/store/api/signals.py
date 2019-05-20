from django.core.cache import cache
from django.db.models.signals import post_delete, post_save, pre_delete
from django.dispatch import receiver

from webdjango.models.Address import Address
from webdjango.signals.CoreSignals import (config_group_register,
                                           config_register)

from .configs import StoreEmailConfig
from .models.Cart import Cart, CartItem, CartTerm, Product
from .models.Discount import CartRule
from .utils.CartUtils import apply_all_cart_rules


@receiver(config_register)
def register_configs(*args, **kwargs):
    return StoreEmailConfig.INPUTS


@receiver(post_save, sender=Product)
def product_saved(sender, instance, created, *args, **kwargs):
    cache.delete_pattern("*product*")


@receiver(config_group_register)
def register_config_group(*args, **kwargs):
    return StoreEmailConfig.GROUP


@receiver(post_delete, sender=Cart)
def remove_cart_items_and_address(sender, instance, *args, **kwargs):
    '''
    Removing all Items from Cart just because sometimes deleting the cart directly was causing
    "Cannot delete or update a parent row: a foreign key constraint fails"
    # TODO: Not Remove address saved to user
    '''

    CartItem.objects.filter(cart=None).all().delete()
    if instance.billing_address_id:
        try:
            instance.billing_address.delete()
        except:
            pass
    if instance.shipping_address_id and instance.billing_address_id is not instance.shipping_address_id:
        try:
            instance.shipping_address.delete()
        except:
            pass


@receiver(post_save, sender=Cart)
def add_term_to_cart(sender, instance, created, *args, **kwargs):
    '''
        Adding Terms to cart, the terms that has the all_carts flag
        set to true
    '''
    if created:
        terms = CartTerm.objects.filter(all_carts=True, enabled=True)
        if terms:
            instance.terms.add(*terms.all())


@receiver(post_save, sender=CartRule)
def cartrule_saved(sender, instance, created, *args, **kwargs):
    """ Clean Cart Rules cache after some rule is changed """
    cache.delete("active-cart-rules-count")
    cache.delete("active-cart-rules")


@receiver(post_save, sender=CartItem)
def add_term_releted_to_product(sender, instance, created, *args, **kwargs):
    if created and instance.product:
        terms_list = [o.id for o in instance.cart.terms.all()]
        terms = CartTerm.objects.filter(enabled=True, products=instance.product).exclude(
            id__in=terms_list)
        if terms:
            instance.cart.terms.add(*terms.all())


@receiver(pre_delete, sender=CartItem)
def remove_term_related_to_product(sender, instance, *args, **kwargs):
    if instance.cart and instance.product:
        terms = instance.cart.terms.filter(products=instance.product)
        if terms:
            for term in terms:
                instance.cart.terms.remove(term)
