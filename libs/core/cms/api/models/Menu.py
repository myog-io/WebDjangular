from djongo import models
from django import forms
from django.db import models as djangoModels


MENU_TARGETS = (
    ('_blank', '_blank'),
    ('_self', '_self'),
    ('_parent', '_parent'),
    ('_top', '_top'),
)

class MenuItem(models.Model):
    TARGET_BLANK = '_blank'
    TARGET_SELF = '_self'
    TARGET_PARENT = '_parent'
    TARGET_TOP = '_top'

    name = djangoModels.CharField(max_length=255)
    url = djangoModels.URLField()
    alt = djangoModels.CharField(max_length=255)
    target = djangoModels.CharField(choices=MENU_TARGETS, default=TARGET_SELF)
    order = djangoModels.IntegerField()
    childrens = models.ArrayModelField(
        model_container='self',
    )
    class Meta:
        abstract = True



class Menu(models.Model):
    """
    CMS Menu Model
    """
    title = djangoModels.CharField(max_length=255)
    slug = djangoModels.SlugField(
        max_length=255, null=True, default=None, blank=True)
    wrapper_class = djangoModels.CharField(max_length=255)
    items = models.ArrayModelField(
        model_container=MenuItem
    )
    created = djangoModels.DateTimeField(auto_now_add=True)
    updated = djangoModels.DateTimeField(auto_now=True)



    def __str__(self):
        return self.title

    class Meta:
        db_table = 'cms_menu'
        ordering = ['-id']
