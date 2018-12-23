# Generated by Django 2.1.4 on 2018-12-23 20:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0004_auto_20181222_2028'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='productattribute',
            name='is_variant',
        ),
        migrations.RemoveField(
            model_name='producttype',
            name='attributes',
        ),
        migrations.AddField(
            model_name='productattribute',
            name='product_type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='product_attributes', to='store.ProductType'),
        ),
        migrations.AddField(
            model_name='productattribute',
            name='product_variant_type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='variant_attributes', to='store.ProductType'),
        ),
        migrations.AlterField(
            model_name='productattribute',
            name='type',
            field=models.CharField(choices=[('text', 'Text'), ('button', 'Button'), ('codeEditor', 'CodeEditor'), ('ckeditor', 'CkEditor'), ('select', 'Select')], default='text', max_length=32),
        ),
    ]
