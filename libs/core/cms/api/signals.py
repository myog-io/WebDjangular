import django.dispatch

from django.db.models.signals import ModelSignal, post_save
from django.dispatch import receiver

from .models.Form import FormSubmitted, ACTION_CHOICES
from webdjango.signals.CoreSignals import config_group_register, config_register
from libs.core.cms.api.configs import CMSCoreConfig

pre_get_page = ModelSignal(
    providing_args=["request", "args", "kwargs"], use_caching=True)
post_get_page = ModelSignal(
    providing_args=["instance", "request", "args", "kwargs"], use_caching=True)


form_action_triggered = django.dispatch.Signal(
    providing_args=["instance", "formSubmitted"])


@receiver(config_register)
def register_configs(*args, **kwargs):
    return CMSCoreConfig.INPUTS


@receiver(config_group_register)
def register_config_group(*args, **kwargs):
    return CMSCoreConfig.GROUP


@receiver(post_save, sender=FormSubmitted)
def form_submitted(sender, instance, created, *args, **kwargs):

    if created:
        for action in instance.form.actions:
            # TODO: create conditions to trigger the based on a JSON LOGIC
            form_action_triggered.send(sender=sender, instance=action,
                                       form_submitted=instance)

@receiver(form_action_triggered, sender=FormSubmitted)
def form_send_email(sender, instance, form_submitted, *args, **kwargs):
    if instance.action_type == 'send_email':
        from webdjango.email import WebDjangoEmailBackend
        email = WebDjangoEmailBackend()



        pass




