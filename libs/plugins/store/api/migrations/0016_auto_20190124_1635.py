# Generated by Django 2.1.4 on 2019-01-24 18:35

from django.db import migrations, models
import django_mysql.models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0015_auto_20190123_1651'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='extra_data',
            field=django_mysql.models.JSONField(blank=True, default=dict),
        )
    ]
