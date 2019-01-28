# Generated by Django 2.1.4 on 2019-01-28 20:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=255),
        ),
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(max_length=60, unique=True),
        ),
        migrations.AlterUniqueTogether(
            name='user',
            unique_together={('email', 'is_email_verified')},
        ),
    ]