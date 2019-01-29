# Generated by Django 2.1.4 on 2019-01-29 01:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_mysql.models
import django_prices.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('store', '0025_auto_20190128_2039'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrderEvent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('event_type', models.CharField(choices=[('placed', 'placed'), ('draft_placed', 'draft_placed'), ('oversold_items', 'oversold_items'), ('marked_as_paid', 'marked_as_paid'), ('canceled', 'canceled'), ('order_paid', 'order_paid'), ('updated', 'updated'), ('email_sent', 'email_sent'), ('sms_sent', 'sms_sent'), ('captured', 'captured'), ('refunded', 'refunded'), ('voided', 'voided'), ('fulfillment_canceled', 'fulfillment_canceled'), ('restocked_items', 'restocked_items'), ('fulfilled_items', 'fulfilled_items'), ('tracking_updated', 'tracking_updated'), ('note_added', 'note_added')], max_length=255)),
                ('data', django_mysql.models.JSONField(blank=True, default=dict)),
            ],
            options={
                'ordering': ('date',),
            },
        ),
        migrations.AddField(
            model_name='order',
            name='billing_address',
            field=django_mysql.models.JSONField(blank=True, default=dict, editable=False),
        ),
        migrations.AddField(
            model_name='order',
            name='customer_note',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AddField(
            model_name='order',
            name='discount_amount',
            field=django_prices.models.MoneyField(blank=True, currency='USD', decimal_places=2, editable=False, max_digits=12, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='extra_data',
            field=django_mysql.models.JSONField(blank=True, default=dict),
        ),
        migrations.AddField(
            model_name='order',
            name='extra_payment_data',
            field=django_mysql.models.JSONField(blank=True, default=dict),
        ),
        migrations.AddField(
            model_name='order',
            name='security_data',
            field=django_mysql.models.JSONField(blank=True, default=dict),
        ),
        migrations.AddField(
            model_name='order',
            name='shipping_address',
            field=django_mysql.models.JSONField(blank=True, default=dict, editable=False),
        ),
        migrations.AddField(
            model_name='order',
            name='shipping_method_name',
            field=models.CharField(blank=True, default=None, editable=False, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='shipping_price',
            field=django_prices.models.MoneyField(blank=True, currency='USD', decimal_places=2, editable=False, max_digits=12, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='sub_total',
            field=django_prices.models.MoneyField(blank=True, currency='USD', decimal_places=2, editable=False, max_digits=12, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='taxes',
            field=django_prices.models.MoneyField(blank=True, currency='USD', decimal_places=2, editable=False, max_digits=12, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='terms',
            field=django_mysql.models.JSONField(blank=True, default=dict, editable=False),
        ),
        migrations.AddField(
            model_name='order',
            name='token',
            field=models.CharField(blank=True, max_length=36, unique=True),
        ),
        migrations.AddField(
            model_name='order',
            name='total',
            field=django_prices.models.MoneyField(blank=True, currency='USD', decimal_places=2, editable=False, max_digits=12, null=True),
        ),
        migrations.AlterField(
            model_name='cart',
            name='terms',
            field=models.ManyToManyField(blank=True, related_name='carts', to='store.CartTerm'),
        ),
        migrations.AlterField(
            model_name='cartterm',
            name='products',
            field=models.ManyToManyField(blank=True, related_name='terms', to='store.Product'),
        ),
        migrations.AlterField(
            model_name='order',
            name='order_num',
            field=models.CharField(editable=False, max_length=100),
        ),
        migrations.AlterField(
            model_name='order',
            name='user_email',
            field=models.EmailField(blank=True, default='', editable=False, max_length=254),
        ),
        migrations.AddField(
            model_name='orderevent',
            name='order',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='events', to='store.Order'),
        ),
        migrations.AddField(
            model_name='orderevent',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
    ]
