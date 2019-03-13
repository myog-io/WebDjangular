# Generated by Django 2.1.7 on 2019-03-13 22:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0012_form_formaction_formfield_formsubmition'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='formaction',
            options={'ordering': ['position']},
        ),
        migrations.AlterModelOptions(
            name='formfield',
            options={'ordering': ['position']},
        ),
        migrations.AddField(
            model_name='form',
            name='error_date',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='form',
            name='error_email',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='form',
            name='error_honeypot',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='form',
            name='error_invalid',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='form',
            name='error_match',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='form',
            name='error_max_length',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='form',
            name='error_message',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='form',
            name='error_min_length',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='form',
            name='error_required',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='form',
            name='error_validation',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='form',
            name='success_message',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='formfield',
            name='element_class',
            field=models.CharField(
                blank=True, default=None, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='formfield',
            name='input_type',
            field=models.CharField(blank=True, max_length=55, null=True),
        ),
        migrations.AddField(
            model_name='formfield',
            name='placeholder',
            field=models.CharField(
                blank=True, default=None, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='formfield',
            name='wrapper_class',
            field=models.CharField(
                blank=True, default=None, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='formaction',
            name='action_type',
            field=models.CharField(
                choices=[('send_email', 'send_email')], default='send_email', max_length=255),
        ),
        migrations.AlterField(
            model_name='formfield',
            name='field_type',
            field=models.CharField(choices=[('button', 'Button'), ('text', 'Text'), ('textArea', 'Text Area'), (
                'select', 'Select'), ('codeEditor', 'CodeEditor')], default='text', max_length=255),
        ),
        migrations.AlterField(
            model_name='formfield',
            name='label_position',
            field=models.CharField(
                choices=[('above', 'above'), ('below', 'below')], default='above', max_length=255),
        ),
    ]
