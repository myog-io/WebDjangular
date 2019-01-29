import requests
from django.conf import settings

import logging
from webdjango.transports.AbstractTransport import AbstractTransport
from webdjango.exceptions import BadRequest
from webdjango.transports.EmailConfig import EmailCoreConfig
from django.utils.html import strip_tags

logger = logging.getLogger(__name__)


class Mailgun(AbstractTransport):
    def __init__(self, *args, **kwargs):
        self.api_key = kwargs[EmailCoreConfig.CONFIG_API_KEY]
        self.domain = kwargs[EmailCoreConfig.CONFIG_DOMAIN]
        self.sender = kwargs[EmailCoreConfig.CONFIG_SENDER]
        super(Mailgun, self).__init__(*args, **kwargs)

    @property
    def auth(self):
        return ('api', self.api_key)

    @property
    def queue_name(self):
        return self.domain

    @property
    def url(self):
        return 'https://api.mailgun.net/v3/{domain}/messages'.format(domain=self.domain)

    def getSendArgs(self):
        return ['to', 'subject', 'body']

    def send(self, to='', subject='', body='', *args, **kwargs):

        data = {
            'from': self.sender,
            'to': to,
            'subject': subject,
            'text': strip_tags(body),
            'html': body
        }

        response = requests.post(self.url, auth=self.auth, data=data)
        httpStatusCode = str(response.status_code)

        # 2XX and #3XX are ok
        if str(httpStatusCode[:1]) != str(2) and str(httpStatusCode[:1]) != str(3):
            raise BadRequest("Mailgun error Request: %s" %
                             (str(vars(response))))

        return self.parseDataFromMessage(response)

    def test(self, email_to, *args, **kwargs):
        messageData = {
            'to': email_to,
            'subject': 'WebDjangular - MAILGUN Test',
            'body': '\
                <h1>It Worked!</h1>\
                <p>Your Mailgun credentials are valid.</p>\
                <p>You may delete this email for now.</p>\
                <p>Thanks</p>\
            '
        }

        return self.send(**messageData)

    def parseDataFromMessage(self, Response):
        responseData = Response.json()

        messageData = {
            'id': responseData['id'],
            'message': responseData['message'],
        }

        return messageData
