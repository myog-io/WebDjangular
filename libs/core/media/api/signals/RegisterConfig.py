from django.dispatch import receiver
from libs.core.media.api.configs import MEDIA_CONFIGS, MEDIA_CONFIG_GROUP
from libs.core.media.api.models.Media import Media
from django.db.models.signals import pre_delete
from webdjango.signals.CoreSignals import config_group_register, config_register


@receiver(config_register)
def register_configs(*args, **kwargs):
    return MEDIA_CONFIGS


@receiver(config_group_register)
def register_config_group(*args, **kwargs):
    return MEDIA_CONFIG_GROUP


@receiver(pre_delete, sender=Media)
def removeFromRemoteStorage(sender, instance, *args, **kwargs):
    if hasattr(instance, 'file'):
        if instance.file != None and instance.file.delete:
            instance.file.delete()
