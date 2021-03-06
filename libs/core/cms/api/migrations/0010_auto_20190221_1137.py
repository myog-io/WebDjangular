# Generated by Django 2.1.4 on 2019-02-21 14:37

import django.core.validators
from django.db import migrations, models
import re


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0009_auto_20190125_1316'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='menuitem',
            options={'ordering': ['position']},
        ),
        migrations.AddField(
            model_name='menuitem',
            name='fragment',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='menuitem',
            name='icon',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='menuitem',
            name='url',
            field=models.CharField(blank=True, max_length=256, null=True, validators=[django.core.validators.RegexValidator(re.compile('^[-a-zA-Z0-9_\\/]+\\Z'), "Enter a valid 'Url' consisting of letters, numbers, underscores, hyphens and backslaches.", 'invalid')]),
        ),
    ]
