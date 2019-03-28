from django.db.models.signals import post_delete, post_save, pre_delete
from django.dispatch import receiver

from webdjango.signals.CoreSignals import (config_group_register,
                                           config_register)

from .configs import StoreEmailConfig
from .models.Cart import Cart, CartItem, CartTerm
from .utils.CartUtils import apply_all_cart_rules


@receiver(config_register)
def register_configs(*args, **kwargs):
    return StoreEmailConfig.INPUTS


@receiver(config_group_register)
def register_config_group(*args, **kwargs):
    return StoreEmailConfig.GROUP


@receiver(post_delete, sender=Cart)
def remove_cart_items(sender, instance, *args, **kwargs):
    '''
    Removing all Items from Cart just because sometimes deleting the cart directly was causing
    "Cannot delete or update a parent row: a foreign key constraint fails"
    '''
    CartItem.objects.filter(cart=None).all().delete()


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
    apply_all_cart_rules(instance)


@receiver(post_save, sender=CartItem)
def add_term_releted_to_product(sender, instance, created, *args, **kwargs):
    if created and instance.product:
        terms_list = [o.id for o in instance.cart.terms.all()]
        terms = CartTerm.objects.filter(enabled=True, products=instance.product).exclude(
            id__in=terms_list)
        if terms:
            instance.cart.terms.add(*terms.all())
    apply_all_cart_rules(instance.cart)


@receiver(pre_delete, sender=CartItem)
def remove_term_related_to_product(sender, instance, *args, **kwargs):
    if instance.cart and instance.product:
        terms = instance.cart.terms.filter(products=instance.product)
        if terms:
            for term in terms:
                instance.cart.terms.remove(term)


@receiver(post_delete, sender=CartItem)
def update_cart_rules(sender, instance, *args, **kwargs):
    if instance.cart:
        apply_all_cart_rules(instance.cart)
