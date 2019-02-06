from webdjango.models.CoreConfig import CoreConfigGroup, CoreConfigInput


class StoreEmailConfig():
    CONFIG_GROUP_SLUG = "store_email_config"
    GROUP = CoreConfigGroup(
        id=CONFIG_GROUP_SLUG,
        title="Store Emails",
        order=7
    )
    NEW_ORDER = 'new_order'
    NEW_ORDER_ADMIN = 'new_order_admin'
    ADMIN_EMAILS = 'admin_emails'
    NEW_ACCCOUNT = 'new_account'
    ORDER_UPDATE = 'order_update'
    ORDER_CANCELED = 'order_canceled'
    ORDER_FULLFILMENT = 'order_fullfilment'
    ORDER_FULLFILMENT_UPDATE = 'order_fullfilment_update'
    PAYMENT_CONFIRMATION = 'payment_confirmation'

    INPUTS = [
        CoreConfigInput(
            id=NEW_ACCCOUNT,
            field_type=CoreConfigInput.FIELD_TYPE_SELECT,
            order=0,
            disabled=False,
            label="New Account Email",
            select_model="Email",
            validation=None,
            wrapper_class="col-4",
            group=CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=NEW_ORDER,
            field_type=CoreConfigInput.FIELD_TYPE_SELECT,
            order=0,
            disabled=False,
            label="Email for new Orders",
            select_model="Email",
            validation=None,
            wrapper_class="col-4",
            group=CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=ADMIN_EMAILS,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            order=0,
            disabled=False,
            label="Admin Emails separeted by ,",
            validation=None,
            wrapper_class="col-4",
            group=CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=NEW_ORDER_ADMIN,
            field_type=CoreConfigInput.FIELD_TYPE_SELECT,
            order=0,
            disabled=False,
            label="New Orders for Admins",
            select_model="Email",
            validation=None,
            wrapper_class="col-4",
            group=CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=ORDER_UPDATE,
            field_type=CoreConfigInput.FIELD_TYPE_SELECT,
            order=0,
            disabled=False,
            label="Order Updated",
            select_model="Email",
            validation=None,
            wrapper_class="col-4",
            group=CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=ORDER_CANCELED,
            field_type=CoreConfigInput.FIELD_TYPE_SELECT,
            order=0,
            disabled=False,
            label="Order Canceled",
            select_model="Email",
            validation=None,
            wrapper_class="col-4",
            group=CONFIG_GROUP_SLUG,
        ),
        
    ]