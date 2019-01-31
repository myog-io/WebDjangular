from django.db.models.signals import post_save
from django.dispatch import receiver
from libs.plugins.store.api.models.Order import Order
from ..models.Reseller import Reseller
from django.core.exceptions import ObjectDoesNotExist


@receiver(post_save, sender=Order)
def order_created_signal(sender, instance, created):
    if 'reseller_id' in instance.extra_data:
        try:
            reseller = Reseller.objects.get(instance.extra_data['reseller_id'])
            reseller.orders.add(instance)
        except ObjectDoesNotExist:
            pass