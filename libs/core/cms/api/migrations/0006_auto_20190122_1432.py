import django.db.models.deletion
import django_mysql.models
from django.db import migrations, models

import webdjango.models.TranslationModel


def insert_system_blocks(apps, schema_editor):

    from libs.core.cms.api.configs import CMSCoreConfig
    from libs.core.cms.api.models.Block import Block
    from libs.core.cms.api.models.Block import BlockClasses
    from webdjango.models.Core import CoreConfig, Website
    from webdjango.configs import DEFAULT_SIDEBAR, FOOTER_WIDGET_HOLDER_1, FOOTER_WIDGET_HOLDER_2, \
        FOOTER_WIDGET_HOLDER_3, FOOTER_WIDGET_HOLDER_4, FOOTER_WIDGET_HOLDER_5, LAYOUT_FULL_CONTENT, \
        LAYOUT_RIGHT_SIDEBAR, LAYOUT_LEFT_SIDEBAR, DEFAULT_SITE_TITLE, DEFAULT_TITLE_SEPARATOR, \
        DEFAULT_TITLE_PLACEHOLDER

    # Default Widgets holders:
    default_sidebar = Block.objects.create(
        block_class=BlockClasses.WIDGET_HOLDER,
        title="Default Sidebar",
        slug=DEFAULT_SIDEBAR,
        is_system=True,
        content=""""""
    )
    footer_wh_1 = Block.objects.create(
        block_class=BlockClasses.WIDGET_HOLDER,
        title="Footer Widgets 1",
        slug=FOOTER_WIDGET_HOLDER_1,
        is_system=True,
        content=""""""
    )
    footer_wh_2 = Block.objects.create(
        block_class=BlockClasses.WIDGET_HOLDER,
        title="Footer Widgets 2",
        slug=FOOTER_WIDGET_HOLDER_2,
        is_system=True,
        content=""""""
    )
    footer_wh_3 = Block.objects.create(
        block_class=BlockClasses.WIDGET_HOLDER,
        title="Footer Widgets 3",
        slug=FOOTER_WIDGET_HOLDER_3,
        is_system=True,
        content=""""""
    )
    footer_wh_4 = Block.objects.create(
        block_class=BlockClasses.WIDGET_HOLDER,
        title="Footer Widgets 4",
        slug=FOOTER_WIDGET_HOLDER_4,
        is_system=True,
        content=""""""
    )
    footer_wh_5 = Block.objects.create(
        block_class=BlockClasses.WIDGET_HOLDER,
        title="Footer Widgets 4",
        slug=FOOTER_WIDGET_HOLDER_5,
        is_system=True,
        content=""""""
    )

    # Default Layouts
    layout_full_content = Block.objects.create(
        block_class=BlockClasses.LAYOUT,
        title="Full Content",
        slug=LAYOUT_FULL_CONTENT,
        is_system=True,
        settings={'type': 'boxed'},
        content="""
                  <div class="row">
                    <div class="col p-0">
                      {{ content }}
                    </div>
                  </div>
                """
    ),
    layout_right_sidebar = Block.objects.create(
        block_class=BlockClasses.LAYOUT,
        title="Right Sidebar",
        slug=LAYOUT_RIGHT_SIDEBAR,
        is_system=True,
        settings={'type': 'boxed'},
        content="""
                  <div class="row">
                    <div class="col-12 col-md-8">
                      {{ content }}
                    </div>
                    <div class="col-12 col-md-4">
                        {{ default_sidebar }}
                    </div>
                  </div>
                """
    ),
    layout_left_sidebar = Block.objects.create(
        block_class=BlockClasses.LAYOUT,
        title="Left Sidebar",
        slug=LAYOUT_LEFT_SIDEBAR,
        is_system=True,
        settings={'type': 'boxed'},
        content="""
                  <div class="row">
                    <div class="col-12 col-md-4">
                        {{ default_sidebar }}
                    </div>
                    <div class="col-12 col-md-8">
                      {{ content }}
                    </div>
                  </div>
                """
    )

    header = Block.objects.filter(slug="header").update(block_class=BlockClasses.HEADER, is_system=True)
    footer = Block.objects.filter(slug="footer").update(block_class=BlockClasses.FOOTER, is_system=True)

    website = Website.objects.filter(code__exact='default').first()

    core_config = CoreConfig.read(CMSCoreConfig.GROUP_SLUG)
    core_config[DEFAULT_SITE_TITLE] = 'WDA'
    core_config[DEFAULT_TITLE_SEPARATOR] = '-'
    core_config[DEFAULT_TITLE_PLACEHOLDER] = '${title} ${title_separator} ${site_title}'

    CoreConfig.write(CMSCoreConfig.GROUP_SLUG, core_config, website=website)


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
        migrations.RunPython(insert_system_blocks)
    ]
