from django.conf import settings
from django.urls import reverse
# from templated_email import send_templated_mail
# from ..core.emails import get_email_base_context
# from ..core.utils import build_absolute_uri
# from ..seo.schema.email import get_order_confirmation_markup
from .models.Order import Fulfillment, Order
from .configs import StoreEmailConfig
from webdjango.email import WebDjangoEmailBackend


def collect_data_for_email(order_pk, template):
    """Collects data required for email sending.
    Args:
        order_pk (int): order primary key
        template (str): email template code
    """
    order = Order.objects.get(pk=order_pk)
    recipient_email = order.get_user_current_email()
    email_context = get_email_base_context()
    email_context['order_details_url'] = build_absolute_uri(
        reverse('order:details', kwargs={'token': order.token}))

    # Order confirmation template requires additional information
    if template == CONFIRM_ORDER_TEMPLATE:
        email_markup = get_order_confirmation_markup(order)
        email_context.update(
            {'order': order, 'schema_markup': email_markup})

    return {
        'recipient_list': [recipient_email], 'template_name': template,
        'context': email_context, 'from_email': settings.ORDER_FROM_EMAIL}


def collect_data_for_fullfillment_email(order_pk, template, fulfillment_pk):
    fulfillment = Fulfillment.objects.get(pk=fulfillment_pk)
    email_data = collect_data_for_email(order_pk, template)
    email_data['context'].update({'fulfillment': fulfillment})
    return email_data


def send_order_confirmation(order_pk):
    """Sends order confirmation email."""
    email_data = collect_data_for_email(order_pk, StoreEmailConfig.NEW_ORDER)
    admin_email_data = collect_data_for_email(
        order_pk,
        StoreEmailConfig.NEW_ORDER_ADMIN
    )
    WebDjangoEmailBackend.send_messages((email_data, admin_email_data))


def send_fulfillment_confirmation(order_pk, fulfillment_pk):
    email_data = collect_data_for_fullfillment_email(
        order_pk, StoreEmailConfig.ORDER_FULLFILMENT, fulfillment_pk)
    WebDjangoEmailBackend.send_messages(email_data)


def send_fulfillment_update(order_pk, fulfillment_pk):
    email_data = collect_data_for_fullfillment_email(
        order_pk, StoreEmailConfig.ORDER_FULLFILMENT_UPDATE, fulfillment_pk)
    WebDjangoEmailBackend.send_messages(email_data)


def send_payment_confirmation(order_pk):
    """Sends payment confirmation email."""
    email_data = collect_data_for_email(
        order_pk,
        StoreEmailConfig.PAYMENT_CONFIRMATION
    )
    WebDjangoEmailBackend.send_messages(email_data)
