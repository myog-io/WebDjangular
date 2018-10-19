from django.dispatch import receiver
from webdjango.signals.CoreSignals import config_register, config_group_register
from libs.core.media.api.configs import MEDIA_CONFIGS, MEDIA_CONFIG_GROUP


@receiver(config_register)
def register_configs(*args, **kwargs):
    return MEDIA_CONFIGS

@receiver(config_group_register)
def register_config_group(*args, **kwargs):
    return MEDIA_CONFIG_GROUP
