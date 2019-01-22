from django.db import models
from django_mysql.models import JSONField

from webdjango.models.AbstractModels import BaseModel


class BlockClasses:
    SIMPLE = 'simple'
    WIDGET_HOLDER = 'widget_holder'
    LAYOUT = 'layout'
    HEADER = 'header'
    FOOTER = 'footer'

    CHOICES = [
        (SIMPLE, 'simple'),
        (WIDGET_HOLDER, 'widget_holder'),
        (LAYOUT, 'layout'),
        (HEADER, 'header'),
        (FOOTER, 'footer')
    ]


class Block(BaseModel):
    """
    CMS Blocks Model
    """
    block_class = models.CharField(max_length=32, choices=BlockClasses.CHOICES, default=BlockClasses.SIMPLE)
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, null=True, default=None, blank=True)
    is_system = models.BooleanField(default=False)
    content = models.TextField()
    settings = JSONField(null=True, default=None)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'cms_block'
        ordering = ['-created']
