import django.db.models.deletion
import django_mysql.models
from django.db import migrations, models

import webdjango.models.TranslationModel




class Migration(migrations.Migration):
    dependencies = [
        ('cms', '0005_auto_20190118_1958'),
    ]

    operations = [
        migrations.CreateModel(
            name='PageCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('slug', models.SlugField(max_length=255, unique=True)),
                ('language', models.CharField(default=webdjango.models.TranslationModel.default_i18n, max_length=5,
                                              validators=[webdjango.models.TranslationModel.validate_i18n])),
                ('translation', django_mysql.models.JSONField(default=None, null=True)),
                ('name', models.CharField(max_length=128)),
                ('description', models.TextField(blank=True)),
                ('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE,
                                             related_name='children', to='cms.PageCategory')),
            ],
            options={
                'db_table': 'cms_page_category',
                'ordering': ['-created'],
            },
        ),
        migrations.CreateModel(
            name='PageTag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('slug', models.SlugField(max_length=255, unique=True)),
                ('language', models.CharField(default=webdjango.models.TranslationModel.default_i18n, max_length=5,
                                              validators=[webdjango.models.TranslationModel.validate_i18n])),
                ('translation', django_mysql.models.JSONField(default=None, null=True)),
                ('name', models.CharField(max_length=128)),
                ('count', models.PositiveIntegerField(default=0)),
                ('description', models.TextField(blank=True)),
            ],
            options={
                'db_table': 'cms_page_tag',
                'ordering': ['-created'],
            },
        ),
        migrations.AddField(
            model_name='block',
            name='block_class',
            field=models.CharField(
                choices=[('simple', 'simple'), ('widget_holder', 'widget_holder'), ('layout', 'layout'),
                         ('header', 'header'), ('footer', 'footer')], default='simple', max_length=32),
        ),
        migrations.AddField(
            model_name='block',
            name='is_system',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='block',
            name='settings',
            field=django_mysql.models.JSONField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='page',
            name='page_class',
            field=models.CharField(choices=[('static', 'static'), ('post', 'post'), ('product', 'product')],
                                   default='static', max_length=32),
        ),
        migrations.AddField(
            model_name='page',
            name='post_type',
            field=models.CharField(
                choices=[('article', 'article'), ('video', 'video'), ('audio', 'audio'), ('image', 'image')],
                default='article', max_length=32),
        ),
        migrations.AddField(
            model_name='page',
            name='categories',
            field=models.ManyToManyField(related_name='pages', to='cms.PageCategory'),
        ),
        migrations.AddField(
            model_name='page',
            name='tags',
            field=models.ManyToManyField(related_name='pages', to='cms.PageTag'),
        ),
        
    ]
