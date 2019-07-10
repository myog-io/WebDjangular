from django.core.validators import RegexValidator, _lazy_re_compile
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils.translation import ngettext_lazy

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
    url = models.CharField(max_length=256, blank=True, null=True)
    # category = models.ForeignKey(
    #    Category, blank=True, null=True, on_delete=models.CASCADE)
    # collection = models.ForeignKey(
    #    Collection, blank=True, null=True, on_delete=models.CASCADE)
    # page = models.ForeignKey(
    #    Page, blank=True, null=True, on_delete=models.CASCADE)

    fragment = models.CharField(max_length=255, blank=True, null=True)
    icon = models.CharField(max_length=255, blank=True, null=True)
    css_class = models.CharField(max_length=255, blank=True, null=True)
    target = models.CharField(
        max_length=255, choices=MENU_TARGETS, default=TARGET_SELF)
    position = models.PositiveSmallIntegerField(default=0)
    parent = models.ForeignKey(
        'MenuItem', related_name='children', on_delete=models.CASCADE, blank=True, null=True)
    menu = models.ForeignKey('Menu', related_name='menu_item',
                             on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        db_table = 'cms_menu_item'
        ordering = ['position']


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
