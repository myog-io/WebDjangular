from django.db.models.signals import ModelSignal
from django.dispatch import receiver
from webdjango.signals.CoreSignals import config_group_register, config_register
from libs.core.analytics.api.configs import AnalyticsCoreConfig

pre_get_page = ModelSignal(
    providing_args=["request", "args", "kwargs"], use_caching=True)
post_get_page = ModelSignal(
    providing_args=["instance", "request", "args", "kwargs"], use_caching=True)


@receiver(config_register)
def register_configs(*args, **kwargs):
    return AnalyticsCoreConfig.INPUTS


@receiver(config_group_register)
def register_config_group(*args, **kwargs):
    return AnalyticsCoreConfig.GROUP
