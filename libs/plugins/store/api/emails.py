import json

from django.conf import settings
from django.core.serializers.json import DjangoJSONEncoder
from django.urls import reverse

from webdjango.email import WebDjangoEmailBackend, get_email_base_context
from webdjango.models.Core import CoreConfig, Website
from webdjango.utils import build_absolute_uri

from .configs import StoreEmailConfig
from .json import StoreJSONEncoder
from .models.Order import Fulfillment, Order

# from templated_email import send_templated_mail


sender = WebDjangoEmailBackend()


def collect_data_for_email(order_pk, template):
    """Collects data required for email sending.
    Args:
        order_pk (int): order primary key
        template (str): email template code
    """
    order = Order.objects.get(pk=order_pk)
    recipient_email = order.get_user_current_email()
    email_context = get_email_base_context()
    # TODO: Get Order Details URL
    # email_context['order_details_url'] = build_absolute_uri(
    #    reverse('order:details', kwargs={'order': order.order_num})
    # )
    new_order = StoreEmailConfig.NEW_ORDER.value
    # Order confirmation template requires additional information
    if template == new_order:
        email_markup = get_order_confirmation_markup(order)
        email_context.update(
            {
                'recipients': [recipient_email],
                'template_id': template,
                'order': order,
                'schema_markup': email_markup
            }
        )
    # TODO: Add more configuration for a FROM email
    return {
        'recipients': [recipient_email],
        'template_id': template,
        'context': email_context
    }


def collect_data_for_fullfillment_email(order_pk, template, fulfillment_pk):
    fulfillment = Fulfillment.objects.get(pk=fulfillment_pk)
    email_data = collect_data_for_email(order_pk, template)
    email_data['context'].update({'fulfillment': fulfillment})
    return email_data


def send_order_confirmation(order_pk):
    """Sends order confirmation email."""
    email_data = collect_data_for_email(
        order_pk,
        StoreEmailConfig.NEW_ORDER.value
    )
    sender.send(email_data)


def send_admin_order_confirmation(order_pk):
    """Sends order confirmation to admins."""
    email_data = collect_data_for_email(
        order_pk,
        StoreEmailConfig.NEW_ORDER.value
    )
    admin_email_data = email_data
    admin_email_data['template_id'] = StoreEmailConfig.NEW_ORDER_ADMIN.value
    admin_email_data['recipients'] = StoreEmailConfig.ADMIN_EMAILS.value
    sender.send(admin_email_data)


def send_fulfillment_confirmation(order_pk, fulfillment_pk):
    email_data = collect_data_for_fullfillment_email(
        order_pk, StoreEmailConfig.ORDER_FULLFILMENT.value, fulfillment_pk)
    sender.send(email_data)


def send_fulfillment_update(order_pk, fulfillment_pk):
    email_data = collect_data_for_fullfillment_email(
        order_pk, StoreEmailConfig.ORDER_FULLFILMENT_UPDATE.value, fulfillment_pk)
    sender.send(email_data)


def send_payment_confirmation(order_pk):
    """Sends payment confirmation email."""
    email_data = collect_data_for_email(
        order_pk,
        StoreEmailConfig.PAYMENT_CONFIRMATION.value
    )
    sender.send(email_data)


def get_organization(order):
    site = order.website
    return {'@type': 'Organization', 'name': site.domain}


def get_product_data(line, organization):
    gross_product_price = line.get_total()
    product_data = {
        '@type': 'Offer',
        'itemOffered': {
            '@type': 'Product',
            'name': line.product_name,
            'sku': line.product_sku,
        },
        'price': gross_product_price.amount,
        'priceCurrency': gross_product_price.currency,
        'eligibleQuantity': {
            '@type': 'QuantitativeValue',
            'value': line.quantity
        },
        'seller': organization}

    product = line.product
    if product:
        product_url = build_absolute_uri(product.get_absolute_url())
        product_data['itemOffered']['url'] = product_url

        product_image = product.get_first_image()
        if product_image:
            image = product_image.image
            product_data['itemOffered']['image'] = build_absolute_uri(
                location=image.url)
    return product_data


def get_order_confirmation_markup(order):
    """Generates schema.org markup for order confirmation email message."""
    # website = order.website
    organization = get_organization(order)
    order_url = build_absolute_uri(order.get_absolute_url())
    data = {
        '@context': 'http://schema.org',
        '@type': 'Order',
        'merchant': organization,
        'orderNumber': order.pk,
        'priceCurrency': order.total.currency,
        'subtotal': order.subtotal.amount,
        'price': order.total.amount,
        'acceptedOffer': [],
        'url': order_url,
        'potentialAction': {
            '@type': 'ViewAction',
            'url': order_url
        },
        'orderStatus': 'http://schema.org/OrderProcessing',
        'orderDate': order.created
    }

    lines = order.lines.all()
    for line in lines:
        product_data = get_product_data(line=line, organization=organization)
        data['acceptedOffer'].append(product_data)
    return json.dumps(data, cls=DjangoJSONEncoder)
