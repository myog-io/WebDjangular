from django.dispatch import receiver
from webdjango.signals.CoreSignals import config_group_register, config_register
from .configs import StoreEmailConfig

@receiver(config_register)
def register_configs(*args, **kwargs):
    return StoreEmailConfig.INPUTS


@receiver(config_group_register)
def register_config_group(*args, **kwargs):
    return StoreEmailConfig.GROUP
