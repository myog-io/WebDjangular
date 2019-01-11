from django.db import models

from libs.core.cms.api.models.Block import Block
from webdjango.models.AbstractModels import SeoModel, PermalinkModel
from webdjango.models.TranslationModel import TranslationModel


class Page(PermalinkModel, SeoModel, TranslationModel):
    """
    CMS Pages Model
    """
    title = models.CharField(max_length=255)
    content = models.TextField()
    header = models.ForeignKey(Block, on_delete=models.PROTECT, related_name='headers', default=None, blank=True)
    footer = models.ForeignKey(Block, on_delete=models.PROTECT, related_name='footers', default=None, blank=True)
    i18n_fields = ['title', 'slug', 'content']

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'cms_page'
        ordering = ['-created']
