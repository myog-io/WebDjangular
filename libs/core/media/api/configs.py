from webdjango.models.CoreConfig import CoreConfigGroup, CoreConfigInput

CONFIG_STORAGE_CLASS = 'media_storage_class'
CONFIG_STORAGE_KEY = 'media_storage_account_key'
CONFIG_STORAGE_NAME = 'media_storage_account_name'
CONFIG_STORAGE_CONTAINER_NAME = 'media_storage_container'
CONFIG_STORAGE_EXTERNAL_URL = 'media_storage_external_url'

STORAGE_OPTIONS = [
    {'value': 'AzureBlobStorage', 'label': 'Azure Blob Storage'}
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
        select_options=STORAGE_OPTIONS,
        placeholder="File Storage Class",
        validation=None,
        wrapper_class=None,
        group=MEDIA_CONFIG_GROUP_SLUG,

    ),
    CoreConfigInput(
        id=CONFIG_STORAGE_KEY,
        field_type=CoreConfigInput.FIELD_TYPE_TEXT,
        input_type="password",
        order=0,
        disabled=False,
        label="Config Key",
        select_options=None,
        placeholder="Storage Config Key",
        validation=None,
        wrapper_class=None,
        group=MEDIA_CONFIG_GROUP_SLUG,
        conditional={
            "!=" : [{"var":CONFIG_STORAGE_CLASS},""]
        }
    ),
    CoreConfigInput(
        id=CONFIG_STORAGE_NAME,
        field_type=CoreConfigInput.FIELD_TYPE_TEXT,
        input_type="text",
        order=0,
        disabled=False,
        label="Config Name",
        select_options=None,
        placeholder="Storage Config Name",
        validation=None,
        wrapper_class=None,
        group=MEDIA_CONFIG_GROUP_SLUG,
        conditional={
            "!=" : [{"var":CONFIG_STORAGE_CLASS},""]
        }

    ),
    CoreConfigInput(
        id=CONFIG_STORAGE_CONTAINER_NAME,
        field_type=CoreConfigInput.FIELD_TYPE_TEXT,
        input_type="text",
        order=0,
        disabled=False,
        label="Config Container Name",
        select_options=None,
        placeholder="Storage Container Name",
        validation=None,
        wrapper_class=None,
        group=MEDIA_CONFIG_GROUP_SLUG,
        conditional={
            "!=" : [{"var":CONFIG_STORAGE_CLASS},""]
        }
    ),
    CoreConfigInput(
        id=CONFIG_STORAGE_EXTERNAL_URL,
        field_type=CoreConfigInput.FIELD_TYPE_TEXT,
        input_type="url",
        order=0,
        disabled=False,
        label="Config Storage External Url",
        select_options=None,
        placeholder="Storage External URL",
        validation=None,
        wrapper_class=None,
        group=MEDIA_CONFIG_GROUP_SLUG,
        conditional={
            "!=" : [{"var":CONFIG_STORAGE_CLASS},""]
        }
    ),
]

