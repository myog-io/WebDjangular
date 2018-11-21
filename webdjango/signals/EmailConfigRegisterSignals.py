from django.dispatch import receiver
from django.db.models.signals import pre_save
from webdjango.transports.EmailConfig import EmailCoreConfig
from webdjango.models.CoreConfig import CoreConfig
from webdjango.email import WebDjangoEmailBackend
from webdjango.signals.CoreSignals import config_group_register, config_register
from webdjango.exceptions import ValidationError

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
        if instance.value[EmailCoreConfig.CONFIG_EMAIL_TYPE] and instance.value[EmailCoreConfig.CONFIG_TEST_EMAIL]:
            emailBackend = WebDjangoEmailBackend()
            emailBackend.set_sender_config(instance.value)
            emailBackend.test(instance.value[EmailCoreConfig.CONFIG_TEST_EMAIL])



