from webdjango.models.CoreConfig import CoreConfigGroup, CoreConfigInput


class EmailCoreConfig():
    CONFIG_EMAIL_OPTION_SMTP = 'Smtp'
    CONFIG_EMAIL_OPTION_MAILGUN = 'Mailgun'
    CONFIG_EMAIL_OPTIONS = [
        {'id': CONFIG_EMAIL_OPTION_SMTP, 'name': 'Custom SMTP'},
        {'id': CONFIG_EMAIL_OPTION_MAILGUN, 'name': 'Mailgun API'}
    ]
    CONFIG_EMAIL_LOGO = 'email_logo'
    CONFIG_EMAIL_TYPE = 'email_type'

    CONFIG_USERNAME = 'email_username'
    CONFIG_PWD = 'email_pwd'
    CONFIG_SENDER = 'email_from'
    CONFIG_TEST_EMAIL = 'email_test'
    CONFIG_HOST = 'email_host'
    CONFIG_PORT = 'email_port'
    CONFIG_SECURITY = 'email_security'
    CONFIG_API_KEY = 'email_api_key'
    CONFIG_DOMAIN = 'email_domain'
    CONFIG_SECURITY_OPTIONS = [
        {'id': 'tls', 'name': 'TLS'},
        {'id': 'ssl', 'name': 'SSL'},
    ]

    EMAIL_CONFIG_GROUP_SLUG = 'email_config'
    EMAIL_CONFIG_GROUP = CoreConfigGroup(
        id=EMAIL_CONFIG_GROUP_SLUG,
        title="Email",
        order=5
    )

    EMAIL_CONFIG_INPUTS = [
        CoreConfigInput(
            id=CONFIG_EMAIL_LOGO,
            field_type=CoreConfigInput.FIELD_TYPE_SELECT,
            input_type="text",
            order=0,
            disabled=False,
            label="Email Default Logo",
            options=CONFIG_EMAIL_OPTIONS,
            placeholder="/path/to/the/logo.png",
            validation=None,
            wrapper_class="col-4",
            group=EMAIL_CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=CONFIG_EMAIL_TYPE,
            field_type=CoreConfigInput.FIELD_TYPE_SELECT,
            input_type="text",
            order=0,
            disabled=False,
            label="Email Type",
            options=CONFIG_EMAIL_OPTIONS,
            placeholder="Email Types",
            validation=None,
            wrapper_class="col-4",
            group=EMAIL_CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=CONFIG_TEST_EMAIL,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="email",
            order=0,
            disabled=False,
            label="Test Email To",
            options=None,
            placeholder="your@email_test.com",
            validation=None,
            wrapper_class="col-4",
            group=EMAIL_CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=CONFIG_SENDER,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="email",
            order=0,
            disabled=False,
            label="Email From",
            options=None,
            placeholder="email@from.com",
            validation=None,
            wrapper_class="col-6",
            group=EMAIL_CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=CONFIG_USERNAME,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="text",
            order=0,
            disabled=False,
            label="SMTP Username",
            options=None,
            placeholder="Username",
            validation=None,
            wrapper_class="col-6",
            group=EMAIL_CONFIG_GROUP_SLUG,
            conditional={
                "==": [{'var': CONFIG_EMAIL_TYPE}, CONFIG_EMAIL_OPTION_SMTP]
            }
        ),
        CoreConfigInput(
            id=CONFIG_PWD,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="password",
            order=0,
            disabled=False,
            label="SMTP Password",
            options=None,
            placeholder="Password",
            validation=None,
            wrapper_class="col-6",
            group=EMAIL_CONFIG_GROUP_SLUG,
            conditional={
                "==": [{'var': CONFIG_EMAIL_TYPE}, CONFIG_EMAIL_OPTION_SMTP]
            }
        ),
        CoreConfigInput(
            id=CONFIG_HOST,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="text",
            order=0,
            disabled=False,
            label="Host",
            options=None,
            placeholder="smtp.yourdomain.com",
            validation=None,
            wrapper_class="col-6",
            group=EMAIL_CONFIG_GROUP_SLUG,
            conditional={
                "==": [{'var': CONFIG_EMAIL_TYPE}, CONFIG_EMAIL_OPTION_SMTP]
            }
        ),
        CoreConfigInput(
            id=CONFIG_PORT,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="number",
            order=0,
            disabled=False,
            label="SMTP Port",
            options=None,
            placeholder="465",
            validation=None,
            wrapper_class="col-3",
            group=EMAIL_CONFIG_GROUP_SLUG,
            conditional={
                "==": [{'var': CONFIG_EMAIL_TYPE}, CONFIG_EMAIL_OPTION_SMTP]
            }
        ),
        CoreConfigInput(
            id=CONFIG_SECURITY,
            field_type=CoreConfigInput.FIELD_TYPE_SELECT,
            input_type="text",
            order=0,
            disabled=False,
            label="SMTP Security",
            options=CONFIG_SECURITY_OPTIONS,
            placeholder="None",
            validation=None,
            wrapper_class="col-3",
            group=EMAIL_CONFIG_GROUP_SLUG,
            conditional={
                "==": [{'var': CONFIG_EMAIL_TYPE}, CONFIG_EMAIL_OPTION_SMTP]
            }
        ),
        CoreConfigInput(
            id=CONFIG_API_KEY,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="text",
            order=0,
            disabled=False,
            label="API Key",
            options=None,
            placeholder="Api Key",
            validation=None,
            wrapper_class="col-6",
            group=EMAIL_CONFIG_GROUP_SLUG,
            conditional={
                "==": [{'var': CONFIG_EMAIL_TYPE}, CONFIG_EMAIL_OPTION_MAILGUN]
            }
        ),
        CoreConfigInput(
            id=CONFIG_DOMAIN,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="text",
            order=0,
            disabled=False,
            label="API Domain",
            options=None,
            placeholder="Api Domain",
            validation=None,
            wrapper_class="col-6",
            group=EMAIL_CONFIG_GROUP_SLUG,
            conditional={
                "==": [{'var': CONFIG_EMAIL_TYPE}, CONFIG_EMAIL_OPTION_MAILGUN]
            }
        ),

    ]
