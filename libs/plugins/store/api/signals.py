from django.db.models.signals import post_init
from django.dispatch import receiver
from .models.Cart import Cart
from .models.Discount import CartRule
from .utils.CartUtils import apply_all_cart_rules, apply_cart_terms
@receiver(post_init, sender=Cart)
def register_configs(sender, instance, *args, **kwargs):
    if instance and instance.id:
        apply_all_cart_rules(instance)
        apply_cart_terms(instance)
