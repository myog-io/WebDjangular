from django.core.exceptions import ObjectDoesNotExist
from django.db import models

from libs.core.cms.api.models.Block import Block
from webdjango.models.AbstractModels import SeoModel, PermalinkModel
from webdjango.models.TranslationModel import TranslationModel


class PageClasses:
    STATIC = 'static'
    POST = 'post'
    PRODUCT = 'product'
    # TODO EVENT = 'event'
    # TODO GALLERY = 'gallery'

    CHOICES = [
        (STATIC, 'static'),
        (POST, 'post'),
        (PRODUCT, 'product')
    ]


class PostType:
    ARTICLE = 'article'
    VIDEO = 'video'
    AUDIO = 'audio'
    IMAGE = 'image'

    CHOICES = [
        (ARTICLE, 'article'),
        (VIDEO, 'video'),
        (AUDIO, 'audio'),
        (IMAGE, 'image')
    ]


class PageTag(PermalinkModel, TranslationModel):
    name = models.CharField(max_length=128)
    count = models.PositiveIntegerField(default=0, null=False)
    description = models.TextField(blank=True)
    i18n_fields = ['name', 'slug', 'description']

    class Meta:
        db_table = 'cms_page_tag'
        ordering = ['-created']

    def __str__(self):
        return '%s object (%s)' % (self.__class__.__name__, self.name)


class PageCategory(PermalinkModel, TranslationModel):
    name = models.CharField(max_length=128)
    description = models.TextField(blank=True)
    parent = models.ForeignKey(
        'self', null=True, blank=True, related_name='children', on_delete=models.CASCADE)
    i18n_fields = ['name', 'slug', 'description']

    class Meta:
        db_table = 'cms_page_category'
        ordering = ['-created']

    def __str__(self):
        return '%s object (%s)' % (self.__class__.__name__, self.name)


class Page(PermalinkModel, SeoModel, TranslationModel):
    """
    CMS Pages Model
    """

    page_class = models.CharField(max_length=32, choices=PageClasses.CHOICES, default=PageClasses.STATIC)
    title = models.CharField(max_length=255)

    content = models.TextField()
    layout = models.ForeignKey(Block, on_delete=models.PROTECT, related_name='layout',
                               default=None, blank=True, null=True)
    header = models.ForeignKey(Block, on_delete=models.PROTECT, related_name='headers',
                               default=None, blank=True, null=True)
    footer = models.ForeignKey(Block, on_delete=models.PROTECT, related_name='footers',
                               default=None, blank=True, null=True)

    tags = models.ManyToManyField(PageTag, related_name='pages')
    categories = models.ManyToManyField(PageCategory, related_name='pages')

    # POST ONLY
    post_type = models.CharField(max_length=32, choices=PostType.CHOICES, default=PostType.ARTICLE)

    # PRODUCT ONLY
    # TODO: Page type product
    # product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)

    i18n_fields = ['title', 'slug', 'content']

    def getLayout(self):
        try:
            return self.layout
        except ObjectDoesNotExist:
            return None

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'cms_page'
        ordering = ['-created']
