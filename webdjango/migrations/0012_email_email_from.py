# Generated by Django 2.1.7 on 2019-03-22 01:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webdjango', '0011_coreconfig_secure'),
    ]

    operations = [
        migrations.AddField(
            model_name='email',
            name='email_from',
            field=models.CharField(blank=True, default=None, max_length=1024, null=True),
        ),
    ]