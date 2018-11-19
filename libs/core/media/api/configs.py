from webdjango.models.CoreConfig import CoreConfigGroup, CoreConfigInput

CONFIG_STORAGE_CLASS = 'media_storage_class'
CONFIG_STORAGE_KEY = 'media_storage_account_key'
CONFIG_STORAGE_NAME = 'media_storage_account_name'
CONFIG_STORAGE_CONTAINER_NAME = 'media_storage_container'
CONFIG_STORAGE_EXTERNAL_URL = 'media_storage_external_url'

STORAGE_AZURE = 'AzureBlobStorage'
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
        select_options=[
            {'value':STORAGE_AZURE, 'label':'Azure Blob Storage'}
        ],
        placeholder="File Storage Class",
        validation=None,
        wrapperClass=None,
        group=MEDIA_CONFIG_GROUP_SLUG,
    ),
    CoreConfigInput(
        id=CONFIG_STORAGE_KEY,
        field_type=CoreConfigInput.FIELD_TYPE_INPUT,
        input_type="password",
        order=0,
        disabled=False,
        label="Config Key",
        select_options=None,
        placeholder="Storage Config Key",
        validation=None,
        wrapperClass=None,
        group=MEDIA_CONFIG_GROUP_SLUG,
    ),
    CoreConfigInput(
        id=CONFIG_STORAGE_NAME,
        field_type=CoreConfigInput.FIELD_TYPE_INPUT,
        input_type="text",
        order=0,
        disabled=False,
        label="Config Name",
        select_options=None,
        placeholder="Storage Config Name",
        validation=None,
        wrapperClass=None,
        group=MEDIA_CONFIG_GROUP_SLUG,
    ),
    CoreConfigInput(
        id=CONFIG_STORAGE_CONTAINER_NAME,
        field_type=CoreConfigInput.FIELD_TYPE_INPUT,
        input_type="text",
        order=0,
        disabled=False,
        label="Config Container Name",
        select_options=None,
        placeholder="Storage Container Name",
        validation=None,
        wrapperClass=None,
        group=MEDIA_CONFIG_GROUP_SLUG,
    ),
    CoreConfigInput(
        id=CONFIG_STORAGE_EXTERNAL_URL,
        field_type=CoreConfigInput.FIELD_TYPE_INPUT,
        input_type="url",
        order=0,
        disabled=False,
        label="Config Storage External Url",
        select_options=None,
        placeholder="Storage External URL",
        validation=None,
        wrapperClass=None,
        group=MEDIA_CONFIG_GROUP_SLUG,
    ),
]
