from webdjango.models.CoreConfig import CoreConfigGroup, CoreConfigInput, AbstractCoreConfigModel


class EmailCoreConfig(AbstractCoreConfigModel):
    CONFIG_EMAIL_OPTION_SMTP = 'Smtp'
    CONFIG_EMAIL_OPTION_MAILGUN = 'Mailgun'
    CONFIG_EMAIL_OPTIONS = [
        {'id': CONFIG_EMAIL_OPTION_SMTP, 'name': 'Custom SMTP'},
        {'id': CONFIG_EMAIL_OPTION_MAILGUN, 'name': 'Mailgun API'}
    ]
    
    
    
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

    CONFIG_EMAIL_LOGO = CoreConfigInput(
        id='email_logo',
        field_type=CoreConfigInput.FIELD_TYPE_TEXT,
        input_type="text",
        order=0,
        disabled=False,
        label="Email Default Logo",
        options=CONFIG_EMAIL_OPTIONS,
        placeholder="/path/to/the/logo.png",
        validation=None,
        wrapper_class="col-4",
        group=EMAIL_CONFIG_GROUP_SLUG,
    )

    CONFIG_EMAIL_TYPE = CoreConfigInput(
        id='email_type',
        field_type=CoreConfigInput.FIELD_TYPE_NGSELECT,
        input_type="text",
        order=0,
        disabled=False,
        label="Email Type",
        options=CONFIG_EMAIL_OPTIONS,
        placeholder="Email Types",
        validation=None,
        wrapper_class="col-4",
        group=EMAIL_CONFIG_GROUP_SLUG,
    )

    CONFIG_TEST_EMAIL = CoreConfigInput(
        id='email_test',
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
    )

    CONFIG_SENDER = CoreConfigInput(
        id='email_from',
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
    )

    CONFIG_USERNAME = CoreConfigInput(
        id='email_username',
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
            "==": [{'var': CONFIG_EMAIL_TYPE.id}, CONFIG_EMAIL_OPTION_SMTP]
        }
    )

    CONFIG_PWD = CoreConfigInput(
        id='email_pwd',
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
            "==": [{'var': CONFIG_EMAIL_TYPE.id}, CONFIG_EMAIL_OPTION_SMTP]
        }
    )

    CONFIG_HOST = CoreConfigInput(
        id='email_host',
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
            "==": [{'var': CONFIG_EMAIL_TYPE.id}, CONFIG_EMAIL_OPTION_SMTP]
        }
    )

    CONFIG_PORT = CoreConfigInput(
        id='email_port',
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
            "==": [{'var': CONFIG_EMAIL_TYPE.id}, CONFIG_EMAIL_OPTION_SMTP]
        }
    )

    CONFIG_SECURITY = CoreConfigInput(
        id='email_security',
        field_type=CoreConfigInput.FIELD_TYPE_NGSELECT,
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
            "==": [{'var': CONFIG_EMAIL_TYPE.id}, CONFIG_EMAIL_OPTION_SMTP]
        }
    )

    CONFIG_API_KEY = CoreConfigInput(
        id='email_api_key',
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
            "==": [{'var': CONFIG_EMAIL_TYPE.id}, CONFIG_EMAIL_OPTION_MAILGUN]
        }
    )

    CONFIG_DOMAIN = CoreConfigInput(
        id='email_domain',
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
            "==": [{'var': CONFIG_EMAIL_TYPE.id}, CONFIG_EMAIL_OPTION_MAILGUN]
        }
    )


    EMAIL_CONFIG_INPUTS = [
        CONFIG_EMAIL_LOGO,
        CONFIG_EMAIL_TYPE,
        CONFIG_TEST_EMAIL,
        CONFIG_SENDER,
        CONFIG_USERNAME,
        CONFIG_PWD,
        CONFIG_HOST,
        CONFIG_PORT,
        CONFIG_SECURITY,
        CONFIG_API_KEY,
        CONFIG_DOMAIN
    ]
