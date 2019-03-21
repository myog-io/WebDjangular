from django.core.exceptions import ObjectDoesNotExist
from django.db.models.signals import post_save
from django.dispatch import receiver

from libs.plugins.store.api.models.Order import Order

from ..models.PlanType import PlanType
from ..models.Reseller import Reseller


@receiver(post_save, sender=Order)
def order_created_signal(sender, instance, created, *args, **kwargs):
    if not created:
        return
    if 'reseller_id' in instance.extra_data:
        try:
            reseller = Reseller.objects.get(
                pk=instance.extra_data['reseller_id'])
            reseller.orders.add(instance)
        except ObjectDoesNotExist:
            pass
    if 'plan_type_id' in instance.extra_data:
        try:
            plan_type = PlanType.objects.get(
                pk=instance.extra_data['plan_type_id'])
            plan_type.orders.add(instance)
        except ObjectDoesNotExist:
            pass
