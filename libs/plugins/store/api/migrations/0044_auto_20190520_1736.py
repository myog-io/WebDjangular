# Generated by Django 2.1.7 on 2019-05-20 20:36

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0043_product_visibility'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='token',
            field=models.CharField(default=uuid.uuid4, editable=False, max_length=40, unique=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='token',
            field=models.CharField(blank=True, default=None, editable=False, max_length=40, null=True),
        ),
    ]
