import django.dispatch
from django.db.models.signals import ModelSignal, post_save
from django.dispatch import receiver

from libs.core.cms.api.configs import CMSCoreConfig
from webdjango.exceptions import BadRequest
from webdjango.signals.CoreSignals import (config_group_register,
                                           config_register)
from webdjango.utils.JsonLogic import jsonLogic

from .models.Form import FormSubmitted

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
        for action in instance.form.actions.all():
            # TODO: create conditions to trigger the based on a JSON LOGIC
            form_action_triggered.send(sender=sender, instance=action,
                                       form_submitted=instance)


@receiver(form_action_triggered, sender=FormSubmitted)
def form_send_email(sender, instance, form_submitted, *args, **kwargs):
    if instance.action_type == 'send_email':

        from webdjango.email import WebDjangoEmailBackend
        sender = WebDjangoEmailBackend()
        send_options = {}
        send_options['context'] = form_submitted.data
        send_options['context']['created'] = form_submitted.created
        send_options['context']['updated'] = form_submitted.updated

        if 'conditions' in instance.data:
            if not jsonLogic(instance.data['conditions'], send_options['context']):
                # Did not pass the Condition to send the email
                # This can be used to send based on the City for instance or for the departament
                return

        if "to" not in instance.data:
            raise BadRequest("Missing 'to' parameter on the action data")

        send_options['recipients'] = instance.data['to'].split(',')

        if "template" in instance.data:
            send_options['template_code'] = instance.data['template']
        elif "template_id" in instance.data:
            send_options['template_id'] = instance.data['template_id']
        elif "message" in instance.data and "subject" in instance.data:
            send_options['message'] = instance.data['message']
            send_options['subject'] = instance.data['subject']
        else:
            raise BadRequest(
                "Missing template/template_id inside the action data, or the message and subject")
        sender.send(send_options)
