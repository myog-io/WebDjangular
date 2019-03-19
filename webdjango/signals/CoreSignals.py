from django.db.models.signals import post_save
from django.dispatch import Signal, receiver

from webdjango.models.Core import Plugin, Theme

config_register = Signal()
config_group_register = Signal()


@receiver(post_save, sender=Plugin)
@receiver(post_save, sender=Theme)
def installPluginTheme(sender, instance, created, *args, **kwargs):
    if 'active' in instance.get_dirty_fields():
        if instance.active:
            # TODO: Install the Theme/Plugin, Maybe Run Migration or anything like this
            obj = sender.objects.get(pk=instance.pk)
            obj.current_version = obj.version
            obj.save()
