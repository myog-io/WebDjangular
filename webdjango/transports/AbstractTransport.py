class AbstractTransport():
    def __init__(self, *args, **kwargs):
        pass

    def getSendArgs(self):
        raise NotImplementedError(
            "You must implement getSendArgs() in your class %s" % (str(type(self).__name__)))

    def send(self, *args, **kwargs):
        raise NotImplementedError(
            "You must implement send() in your class %s" % (str(type(self).__name__)))

    def test(self, email_to, *args, **kwargs):
        messageData = {
            'to': email_to,
            'subject': 'WebDjangular - Email Test',
            'body': '\
                    <h1>It Worked!</h1>\
                    <p>Your Custom credentials are valid.</p>\
                    <p>You may delete this email for now.</p>\
                    <p>Thanks</p>\
                '
        }
        return self.send(**messageData)
