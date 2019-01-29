from django.conf import settings
from django.core.mail.backends.base import BaseEmailBackend
from django.core.mail.message import sanitize_address
from requests.exceptions import HTTPError
from rest_framework.fields import empty
from webdjango.models.Core import CoreConfig
from webdjango.transports.EmailConfig import EmailCoreConfig

from webdjango.Tools import Tools
from webdjango.exceptions import ServiceUnavailable, ValidationError


class WebDjangoEmailBackend(BaseEmailBackend):
    """
    A wrapper that Uses our System Transport to send messages
    @sender is chield from AbstractTransport
    """
    sender = None
    def __init__(self, fail_silently=False, **kwargs):
        config = CoreConfig.read(EmailCoreConfig.EMAIL_CONFIG_GROUP_SLUG)
        if config[EmailCoreConfig.CONFIG_EMAIL_TYPE]:
            self.set_sender_config(config)

        super().__init__(fail_silently=fail_silently, **kwargs)


    def set_sender_config(self, config):
        className = config[EmailCoreConfig.CONFIG_EMAIL_TYPE]
        if className and className is not empty:
            classRef = Tools.getClassReference("webdjango.transports.email.{}".format(str(className)), str(className))
            if classRef:
                self.sender = classRef(**config)

    def send_messages(self, email_messages):
        """
        Send one or more EmailMessage objects and return the number of email
        messages sent.
        """
        if not email_messages:
            return
        num_sent = 0
        for message in email_messages:
            sent = self._send(message)
            if sent:
                num_sent += 1
        return num_sent

    def _send(self, email_message):
        """A helper method that does the actual sending."""
        if not email_message.recipients():
            return False
        encoding = email_message.encoding or settings.DEFAULT_CHARSET

        recipients = [sanitize_address(addr, encoding)
                      for addr in email_message.recipients()]
        message = email_message.message()
        subject = email_message.subject
        if self.sender:
            return self.sender.send(to=recipients, subject=subject, body=message)
        raise ServiceUnavailable("No Email SMTP or API Configurated to send email")

    def test(self,email_to):
        if self.sender:
            self.sender.test(email_to)
            return True

        raise ValidationError("No Sender Configurated")
