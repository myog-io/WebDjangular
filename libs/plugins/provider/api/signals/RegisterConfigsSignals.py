from django.dispatch import receiver
from webdjango.signals.CoreSignals import config_group_register, config_register
from ..config import ProviderConfig

@receiver(config_register)
def register_configs(*args, **kwargs):
    return ProviderConfig.INPUTS


@receiver(config_group_register)
def register_config_group(*args, **kwargs):
    return ProviderConfig.GROUP
