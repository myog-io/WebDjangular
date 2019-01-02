from django.db import models

from webdjango.models.AbstractModels import BaseModel

MENU_TARGETS = (
    ('_blank', '_blank'),
    ('_self', '_self'),
    ('_parent', '_parent'),
    ('_top', '_top'),
)


class MenuItem(BaseModel):
    TARGET_BLANK = '_blank'
    TARGET_SELF = '_self'
    TARGET_PARENT = '_parent'
    TARGET_TOP = '_top'

    name = models.CharField(max_length=255)
    url = models.URLField()
    alt = models.CharField(max_length=255)
    target = models.CharField(max_length=255, choices=MENU_TARGETS, default=TARGET_SELF)
    position = models.PositiveSmallIntegerField()
    parent = models.ForeignKey('MenuItem', related_name='children', on_delete=models.CASCADE, blank=True, null=True)
    menu = models.ForeignKey('Menu', related_name='menu_item', on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        db_table = 'cms_menu_item'
        ordering = ['-created']


class Menu(BaseModel):
    """
    CMS Menu Model
    """
    title = models.CharField(max_length=255)
    slug = models.SlugField(
        max_length=255, null=True, default=None, blank=True)
    wrapper_class = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'cms_menu'
        ordering = ['-created']
