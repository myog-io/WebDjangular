from webdjango.models.CoreConfig import (AbstractCoreConfigModel,
                                         CoreConfigGroup, CoreConfigInput)


class StoreEmailConfig(AbstractCoreConfigModel):
    CONFIG_GROUP_SLUG = "store_email_config"
    GROUP = CoreConfigGroup(
        id=CONFIG_GROUP_SLUG,
        title="Store Emails",
        order=7,
        secure=True,
    )

    NEW_ACCCOUNT = CoreConfigInput(
        id='new_account',
        field_type=CoreConfigInput.FIELD_TYPE_NGSELECT,
        order=0,
        disabled=False,
        label="New Account Email",
        select_model="Email",
        validation=None,
        wrapper_class="col-4",
        group=CONFIG_GROUP_SLUG,
    )

    NEW_ORDER = CoreConfigInput(
        id='new_order',
        field_type=CoreConfigInput.FIELD_TYPE_NGSELECT,
        order=0,
        disabled=False,
        label="Email for new Orders",
        select_model="Email",
        validation=None,
        wrapper_class="col-4",
        group=CONFIG_GROUP_SLUG,
    )

    ADMIN_EMAILS = CoreConfigInput(
        id='admin_emails',
        field_type=CoreConfigInput.FIELD_TYPE_TEXT,
        input_type="email",
        order=0,
        disabled=False,
        label="Admin Emails separeted by,",
        validation=None,
        wrapper_class="col-4",
        group=CONFIG_GROUP_SLUG,
    )

    NEW_ORDER_ADMIN = CoreConfigInput(
        id='new_order_admin',
        field_type=CoreConfigInput.FIELD_TYPE_NGSELECT,
        order=0,
        disabled=False,
        label="New Orders for Admins",
        select_model="Email",
        validation=None,
        wrapper_class="col-4",
        group=CONFIG_GROUP_SLUG,
    )

    ORDER_UPDATE = CoreConfigInput(
        id='order_update',
        field_type=CoreConfigInput.FIELD_TYPE_NGSELECT,
        order=0,
        disabled=False,
        label="Order Updated",
        select_model="Email",
        validation=None,
        wrapper_class="col-4",
        group=CONFIG_GROUP_SLUG,
    )

    ORDER_CANCELED = CoreConfigInput(
        id='order_canceled',
        field_type=CoreConfigInput.FIELD_TYPE_NGSELECT,
        order=0,
        disabled=False,
        label="Order Canceled",
        select_model="Email",
        validation=None,
        wrapper_class="col-4",
        group=CONFIG_GROUP_SLUG,
    )

    ORDER_FULLFILMENT = CoreConfigInput(
        id='order_fullfilment',
        field_type=CoreConfigInput.FIELD_TYPE_NGSELECT,
        order=0,
        disabled=False,
        label="Order Fullfilment",
        select_model="Email",
        validation=None,
        wrapper_class="col-4",
        group=CONFIG_GROUP_SLUG,
    )

    ORDER_FULLFILMENT_UPDATE = CoreConfigInput(
        id='order_fullfilment_update',
        field_type=CoreConfigInput.FIELD_TYPE_NGSELECT,
        order=0,
        disabled=False,
        label="Order Fullfilemnt Update",
        select_model="Email",
        validation=None,
        wrapper_class="col-4",
        group=CONFIG_GROUP_SLUG,
    )

    PAYMENT_CONFIRMATION = CoreConfigInput(
        id='payment_upodate',
        field_type=CoreConfigInput.FIELD_TYPE_NGSELECT,
        order=0,
        disabled=False,
        label="Payment Confirmation",
        select_model="Email",
        validation=None,
        wrapper_class="col-4",
        group=CONFIG_GROUP_SLUG,
    )

    INPUTS = [
        NEW_ACCCOUNT,
        NEW_ORDER,
        ADMIN_EMAILS,
        NEW_ORDER_ADMIN,
        ORDER_UPDATE,
        ORDER_CANCELED,
        ORDER_FULLFILMENT,
        ORDER_FULLFILMENT_UPDATE,
        PAYMENT_CONFIRMATION
    ]
