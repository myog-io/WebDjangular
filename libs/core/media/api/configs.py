from webdjango.models.CoreConfig import CoreConfigGroup, CoreConfigInput

CONFIG_STORAGE_CLASS = 'media_storage_class'
CONFIG_STORAGE_KEY = 'media_storage_account_key'
CONFIG_STORAGE_NAME = 'media_storage_account_name'
CONFIG_STORAGE_CONTAINER_NAME = 'media_storage_container'
CONFIG_STORAGE_EXTERNAL_URL = 'media_storage_external_url'
CONFIG_STORAGE_JSON_CREDENTIALS = 'media_storage_json_credentials'

STORAGE_OPTION_AZURE = 'AzureBlobStorage'
STORAGE_OPTION_GOOGLE = 'GoogleStorage'
STORAGE_OPTIONS = [
    {'id': '', 'name': 'File Storage'},
    {'id': STORAGE_OPTION_AZURE, 'name': 'Azure Blob Storage'},
    {'id': STORAGE_OPTION_GOOGLE, 'name': 'Goole Storage'}
]

MEDIA_CONFIG_GROUP_SLUG = 'media_config'
MEDIA_CONFIG_GROUP = CoreConfigGroup(
    id=MEDIA_CONFIG_GROUP_SLUG,
    title="File Storage",
    order=10
)

MEDIA_CONFIGS = [
    CoreConfigInput(
        id=CONFIG_STORAGE_CLASS,
        field_type=CoreConfigInput.FIELD_TYPE_SELECT,
        input_type="text",
        order=0,
        disabled=False,
        label="Storage Class",
        options=STORAGE_OPTIONS,
        placeholder="File Storage Class",
        validation=None,
        wrapper_class=None,
        group=MEDIA_CONFIG_GROUP_SLUG,

    ),
    CoreConfigInput(
        id=CONFIG_STORAGE_JSON_CREDENTIALS,
        field_type=CoreConfigInput.FIELD_TYPE_CODE_EDITOR,
        order=99,
        disabled=False,
        label="Google Storage Config Json",
        options={'language': 'json'},
        placeholder="Google Storage Config Json",
        validation=None,
        wrapper_class=None,
        group=MEDIA_CONFIG_GROUP_SLUG,
        conditional={
            "==" : [{"var":CONFIG_STORAGE_CLASS},STORAGE_OPTION_GOOGLE]
        }
    ),
    CoreConfigInput(
        id=CONFIG_STORAGE_KEY,
        field_type=CoreConfigInput.FIELD_TYPE_TEXT,
        input_type="password",
        order=0,
        disabled=False,
        label="Config Key",
        options=None,
        placeholder="Storage Config Key",
        validation=None,
        wrapper_class=None,
        group=MEDIA_CONFIG_GROUP_SLUG,
        conditional={
            "==" : [{"var":CONFIG_STORAGE_CLASS},STORAGE_OPTION_AZURE]
        }
    ),
    CoreConfigInput(
        id=CONFIG_STORAGE_NAME,
        field_type=CoreConfigInput.FIELD_TYPE_TEXT,
        input_type="text",
        order=0,
        disabled=False,
        label="Config Name",
        options=None,
        placeholder="Storage Config Name",
        validation=None,
        wrapper_class=None,
        group=MEDIA_CONFIG_GROUP_SLUG,
        conditional={
            "==" : [{"var":CONFIG_STORAGE_CLASS},STORAGE_OPTION_AZURE]
        }

    ),
    CoreConfigInput(
        id=CONFIG_STORAGE_CONTAINER_NAME,
        field_type=CoreConfigInput.FIELD_TYPE_TEXT,
        input_type="text",
        order=0,
        disabled=False,
        label="Config Bucket/Container Name",
        options=None,
        placeholder="Storage Container Name",
        validation=None,
        wrapper_class=None,
        group=MEDIA_CONFIG_GROUP_SLUG,
        conditional={
            "!=" : [{"var":CONFIG_STORAGE_CLASS},'']
        }
    ),
    CoreConfigInput(
        id=CONFIG_STORAGE_EXTERNAL_URL,
        field_type=CoreConfigInput.FIELD_TYPE_TEXT,
        input_type="url",
        order=0,
        disabled=False,
        label="Config Storage External Url",
        options=None,
        placeholder="Storage External URL",
        validation=None,
        wrapper_class=None,
        group=MEDIA_CONFIG_GROUP_SLUG,
        conditional={
            "==" : [{"var":CONFIG_STORAGE_CLASS},STORAGE_OPTION_AZURE]
        }
    ),
]

