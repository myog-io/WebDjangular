from django.dispatch import receiver
from webdjango.signals.CoreSignals import config_register
from libs.core.media.api.configs import MEDIA_CONFIGS


@receiver(config_register)
def register_configs(*args, **kwargs):

    return MEDIA_CONFIGS
