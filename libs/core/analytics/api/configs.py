from webdjango.configs import GOOGLE_ANALYTICS_TRACKING_ID, GOOGLE_ANALYTICS_DOMAIN

from webdjango.models.CoreConfig import CoreConfigGroup, CoreConfigInput


class AnalyticsCoreConfig:
    GROUP_SLUG = 'analytics_core'

    GROUP = CoreConfigGroup(
        id=GROUP_SLUG,
        title="Analytics Website",
        order=1
    )
    INPUTS = [
        CoreConfigInput(
            id=GOOGLE_ANALYTICS_TRACKING_ID,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="text",
            order=1,
            disabled=False,
            label="Google Analytics Tracking ID",
            validation=None,
            wrapper_class="col-12",
            group=GROUP_SLUG,
        ),
        CoreConfigInput(
            id=GOOGLE_ANALYTICS_DOMAIN,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="text",
            order=2,
            disabled=False,
            label="Google Analytics Domain",
            placeholder='default: auto',
            validation=None,
            wrapper_class="col-12",
            group=GROUP_SLUG,
        )
    ]
