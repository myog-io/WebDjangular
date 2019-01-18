# Generated by Django 2.1.4 on 2019-01-18 21:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0009_auto_20181227_1624'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='cartrule',
            options={'ordering': ['-pk']},
        ),
        migrations.AlterModelOptions(
            name='catalogrule',
            options={'ordering': ['-pk']},
        ),
        migrations.AlterField(
            model_name='cartrule',
            name='is_active',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='catalogrule',
            name='is_active',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='productattribute',
            name='class_type',
            field=models.CharField(choices=[('select', 'Select'), ('codeEditor', 'CodeEditor'), ('button', 'Button'), ('text', 'Text')], default='text', max_length=32),
        ),
    ]