from djongo.models import Model
from django.db import models as djangoModels


class Form(Model):
    """
    Form Model
    """
    title = djangoModels.CharField(max_length=255)
    slug = djangoModels.SlugField(max_length=70, unique=True, null=False)
    content = djangoModels.TextField()
    created = djangoModels.DateTimeField(auto_now_add=True)
    updated = djangoModels.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'forms_form'
        ordering = ['-id']
