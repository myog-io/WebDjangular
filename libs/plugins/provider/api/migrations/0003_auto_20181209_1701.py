# Generated by Django 2.1.4 on 2018-12-09 19:01

from django.db import migrations, models
import django.db.models.deletion
import djongo.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0009_auto_20181209_1701'),
        ('provider', '0002_auto_20181129_1626'),
    ]

    operations = [
        migrations.CreateModel(
            name='PageRedirect',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'provider_redirect',
                'ordering': ['-id'],
            },
        ),
        migrations.AlterModelOptions(
            name='city',
            options={'ordering': ['-id']},
        ),
        migrations.AddField(
            model_name='pageredirect',
            name='cities',
            field=djongo.models.fields.ArrayReferenceField(on_delete=django.db.models.deletion.SET_NULL, related_name='redirect', to='provider.City'),
        ),
        migrations.AddField(
            model_name='pageredirect',
            name='default_page',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='provider_default', to='cms.Page'),
        ),
        migrations.AddField(
            model_name='pageredirect',
            name='redirect_page',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='provider_redirect', to='cms.Page'),
        ),
    ]
