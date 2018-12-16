from djongo import models

from webdjango.models.AbstractModels import BaseModel


class Block(BaseModel):
    """
    CMS Blocks Model
    """
    title = models.CharField(max_length=255)
    slug = models.SlugField(
        max_length=255, null=True, default=None, blank=True)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'cms_block'
        ordering = ['-created']
