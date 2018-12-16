from djongo import models
from django import forms



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

    name = models.CharField(max_length=255)
    url = models.URLField()
    alt = models.CharField(max_length=255)
    target = models.CharField(choices=MENU_TARGETS, default=TARGET_SELF)
    order = models.IntegerField()
    children = models.ArrayModelField(model_container='self')
    class Meta:
        abstract = True



class Menu(models.Model):
    """
    CMS Menu Model
    """
    title = models.CharField(max_length=255)
    slug = models.SlugField(
        max_length=255, null=True, default=None, blank=True)
    wrapper_class = models.CharField(max_length=255)
    items = models.ArrayModelField(
        model_container=MenuItem
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)



    def __str__(self):
        return self.title

    class Meta:
        db_table = 'cms_menu'
        ordering = ['-created']
