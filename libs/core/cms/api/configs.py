from django.conf.global_settings import LANGUAGES

from webdjango.configs import CONFIG_HOME_PAGE, DEFAULT_FOOTER, DEFAULT_HEADER, DEFAULT_I18N, DEFAULT_SITE_TITLE, \
    DEFAULT_TITLE_SEPARATOR, DEFAULT_TITLE_PLACEHOLDER
from webdjango.models.CoreConfig import CoreConfigGroup, CoreConfigInput


class CMSCoreConfig:
    GROUP_SLUG = 'cms_core'
    GOOGLE_MAPS_API_KEY = 'google_maps_api_key'
    GROUP = CoreConfigGroup(
        id=GROUP_SLUG,
        title="Core Website",
        order=0
    )
    INPUTS = [
        CoreConfigInput(
            id=CONFIG_HOME_PAGE,
            field_type=CoreConfigInput.FIELD_TYPE_SELECT,
            input_type="text",
            order=0,
            disabled=False,
            label="Home Page",
            select_model="Page",
            placeholder="Select your Default Home Page",
            validation=None,
            wrapper_class="col-12",
            group=GROUP_SLUG,
        ),
        CoreConfigInput(
            id=DEFAULT_HEADER,
            field_type=CoreConfigInput.FIELD_TYPE_SELECT,
            input_type="text",
            order=0,
            disabled=False,
            label="Default Header ",
            select_model="Block",
            placeholder="Select your Default Header",
            validation=None,
            wrapper_class="col-6",
            group=GROUP_SLUG,
            select_options={ 'block_class': 'header'},
        ),
        CoreConfigInput(
            id=DEFAULT_FOOTER,
            field_type=CoreConfigInput.FIELD_TYPE_SELECT,
            input_type="text",
            order=0,
            disabled=False,
            label="Default Footer",
            select_model="Block",
            placeholder="Select your Default Footer",
            validation=None,
            wrapper_class="col-6",
            select_options={ 'block_class': 'footer'},
            group=GROUP_SLUG,
        ),
        CoreConfigInput(
            id=DEFAULT_I18N,
            field_type=CoreConfigInput.FIELD_TYPE_SELECT,
            input_type="text",
            order=0,
            disabled=False,
            label="Default Language",
            select_options=LANGUAGES,
            placeholder="Select your Default Website Language",
            validation=None,
            wrapper_class="col-12",
            group=GROUP_SLUG,
        ),
        CoreConfigInput(
            id=GOOGLE_MAPS_API_KEY,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="text",
            order=10,
            disabled=False,
            label="Google Maps API KEY",
            validation=None,
            wrapper_class="col-12",
            group=GROUP_SLUG,
        ),
        CoreConfigInput(
            id=DEFAULT_SITE_TITLE,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="text",
            order=12,
            disabled=False,
            label="Site Title",
            validation=None,
            wrapper_class="col-12",
            group=GROUP_SLUG,
        ),
        CoreConfigInput(
            id=DEFAULT_TITLE_SEPARATOR,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="text",
            order=13,
            disabled=False,
            label="Site Title Separator",
            validation=None,
            wrapper_class="col-12",
            group=GROUP_SLUG,
        ),
        CoreConfigInput(
            id=DEFAULT_TITLE_PLACEHOLDER,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="text",
            order=14,
            disabled=False,
            label="Site Title Placeholder",
            validation=None,
            wrapper_class="col-12",
            group=GROUP_SLUG,
        )
    ]
