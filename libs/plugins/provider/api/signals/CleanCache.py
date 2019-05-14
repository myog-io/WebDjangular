import django.dispatch
from django.db.models.signals import ModelSignal, post_save
from django.dispatch import receiver

from ..models.City import City
from ..models.Channel import Channel
from ..models.PlanType import PlanType


from django.core.cache import cache

@receiver(post_save, sender=City)
def city_saved(sender, instance, created, *args, **kwargs):
    cache.delete_pattern("*city*")

@receiver(post_save, sender=Channel)
def channel_saved(sender, instance, created, *args, **kwargs):
    cache.delete_pattern("*channel*")

@receiver(post_save, sender=PlanType)
def plantype_saved(sender, instance, created, *args, **kwargs):
    cache.delete_pattern("*plan-type*")