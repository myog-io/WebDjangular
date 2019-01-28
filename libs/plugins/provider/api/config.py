from webdjango.models.CoreConfig import CoreConfigGroup, CoreConfigInput


class ProviderConfig():
    CONFIG_SVA_SCM_CODES = 'sva_scm_codes'
    CONFIG_SVA = 'sva_total'
    CONFIG_SCM = 'scm_total'
    CONFIG_STFC_CODES = 'stfc_codes'
    CONFIG_SEAC_CODES = 'seac_codes'
    CONFIG_GROUP_SLUG = 'provider'
    GROUP = CoreConfigGroup(
        id=CONFIG_GROUP_SLUG,
        title="Provider",
        order=6
    )

    INPUTS = [
        CoreConfigInput(
            id=CONFIG_SVA_SCM_CODES,
            field_type=CoreConfigInput.FIELD_TYPE_SELECT,
            input_type="multiple",
            order=0,
            disabled=False,
            label="SVA & SCM Product Types",
            select_model="ProductType",
            validation=None,
            wrapper_class="col-4",
            group=CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=CONFIG_SVA,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="number",
            order=0,
            disabled=False,
            label="SVA Percentage",
            select_model="ProductType",
            validation=None,
            wrapper_class="col-4",
            group=CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=CONFIG_SCM,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="number",
            order=0,
            disabled=False,
            label="SCM Percentage",
            select_model="ProductType",
            validation=None,
            wrapper_class="col-4",
            group=CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=CONFIG_STFC_CODES,
            field_type=CoreConfigInput.FIELD_TYPE_SELECT,
            input_type="multiple",
            order=0,
            disabled=False,
            label="STFC Product Types",
            select_model="ProductType",
            validation=None,
            wrapper_class="col-6",
            group=CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=CONFIG_SEAC_CODES,
            field_type=CoreConfigInput.FIELD_TYPE_SELECT,
            input_type="multiple",
            order=0,
            disabled=False,
            label="SEAC Product Types",
            select_model="ProductType",
            validation=None,
            wrapper_class="col-6",
            group=CONFIG_GROUP_SLUG,
        ),
        
    ]
