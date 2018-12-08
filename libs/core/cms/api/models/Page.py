from djongo import models
from django.db import models as djangoModels
from webdjango.models.AbstractModels import SeoModel, TranslationModel, DateTimeModel

from libs.core.cms.api.models.Block import Block

class Page(SeoModel, TranslationModel, DateTimeModel):
    """
    CMS Pages Model
    """
    title = djangoModels.CharField(max_length=255)
    slug = djangoModels.SlugField(
        max_length=255, null=True, default=None, blank=True)
    content = djangoModels.TextField()
    header = djangoModels.ForeignKey(Block, on_delete=models.PROTECT, related_name='headers', default=None, blank=True)
    footer = djangoModels.ForeignKey(Block, on_delete=models.PROTECT, related_name='footers', default=None, blank=True)
    i18n_fields = ['title', 'slug', 'content']

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'cms_page'
        ordering = ['-id']
