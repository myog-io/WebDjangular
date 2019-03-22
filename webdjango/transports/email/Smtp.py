import requests
from django.conf import settings
from django.core.mail import EmailMessage
from django.core.mail.backends.smtp import EmailBackend
from rest_framework.exceptions import ValidationError

from webdjango.transports.AbstractTransport import AbstractTransport
from webdjango.transports.EmailConfig import EmailCoreConfig


class Smtp(AbstractTransport):

    def __init__(self, *args, **kwargs):
        super(Smtp, self).__init__(*args, **kwargs)

        self.username = kwargs[EmailCoreConfig.CONFIG_USERNAME.id]
        self.password = kwargs[EmailCoreConfig.CONFIG_PWD.id]
        self.sender = kwargs[EmailCoreConfig.CONFIG_SENDER.id]
        self.host = kwargs[EmailCoreConfig.CONFIG_HOST.id]
        self.port = (kwargs[EmailCoreConfig.CONFIG_PORT.id]
                     if EmailCoreConfig.CONFIG_PORT.id in kwargs else 25)
        self.security = kwargs[EmailCoreConfig.CONFIG_SECURITY.id]

    @property
    def is_tls(self):
        return self.security == 'tls'

    @property
    def is_ssl(self):
        return self.security == 'ssl'

    @property
    def smtp_backend(self):
        # raises an error if it fails to send
        return EmailBackend(host=self.host, port=self.port, username=self.username, password=self.password, use_tls=self.is_tls, use_ssl=self.is_ssl, fail_silently=False)

    @property
    def queue(self):
        return self.username

    def getSendArgs(self):
        return ['to', 'subject', 'body']

    def send(self, to='', subject='', body='', content_subtype='html', sender=None, *args, **kwargs):
        if not sender:
            sender = self.sender
        email = EmailMessage(subject=subject, body=body,
                             from_email="{0}<{1}>".format(sender, self.username), to=to, connection=self.smtp_backend)
        email.content_subtype = content_subtype

        if email.send():
            return True
        else:
            raise ValidationError(
                "Email could not be sent due to SMTP credentials haven't worked it")

    def getInfo(self):
        return {}

    def test(self, email_to, *args, **kwargs):
        messageData = {
            'to': email_to,
            'subject': 'WebDjangular SMTP Test',
            'body': '\
                <h1>It Worked!</h1>\
                <p>Your SMTP credentials are valid.</p>\
                <p>You may delete this email for now.</p>\
                <p>Thanks</p>\
            '
        }
        return self.send(**messageData)
