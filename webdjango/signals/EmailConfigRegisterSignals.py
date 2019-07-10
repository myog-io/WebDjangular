from smtplib import SMTPConnectError

from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from urllib3.exceptions import SSLError

from webdjango.email import WebDjangoEmailBackend
from webdjango.exceptions import BadRequest, ValidationError
from webdjango.models.CoreConfig import CoreConfig
from webdjango.signals.CoreSignals import (config_group_register,
                                           config_register)
from webdjango.transports.EmailConfig import EmailCoreConfig


@receiver(config_register)
def register_configs(*args, **kwargs):
    return EmailCoreConfig.EMAIL_CONFIG_INPUTS


@receiver(config_group_register)
def register_config_group(*args, **kwargs):
    return EmailCoreConfig.EMAIL_CONFIG_GROUP


@receiver(pre_save, sender=CoreConfig)
def validate_email_config(sender, instance, **kwargs):
    """
    Using the Signal to Validate the email, if something goes wrong we will not allow the save
    """
    if instance.slug == EmailCoreConfig.EMAIL_CONFIG_GROUP_SLUG:
        if EmailCoreConfig.CONFIG_EMAIL_TYPE.id in instance.value and EmailCoreConfig.CONFIG_TEST_EMAIL.id in instance.value:
            sender = WebDjangoEmailBackend()
            sender.set_sender_config(instance.value)
            try:
                sender.test(
                    (instance.value[EmailCoreConfig.CONFIG_TEST_EMAIL.id],))
            except Exception as e:
                raise BadRequest(str(e))

        else:
            raise BadRequest("Email Test did not Work, Missing parameters")
