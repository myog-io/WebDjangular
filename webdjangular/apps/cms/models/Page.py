from djongo import models
from django.db import models as djangoModels

class Page(models.Model):
    title = djangoModels.CharField(max_length=255)
    slug = djangoModels.CharField(max_length=255, null=True, default=None, blank=True)
    content = djangoModels.TextField()
    created = djangoModels.DateTimeField(auto_now_add=True)
    updated = djangoModels.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
