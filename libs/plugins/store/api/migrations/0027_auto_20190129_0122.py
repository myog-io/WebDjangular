# Generated by Django 2.1.4 on 2019-01-29 03:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0026_auto_20190129_0157'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='email',
            field=models.CharField(default=None, max_length=64, null=True),
        ),
    ]
