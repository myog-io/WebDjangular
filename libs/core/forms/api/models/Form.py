from django.db import models as djangoModels
from djongo import models
from djongo.models.json import JSONField
from webdjango.models.AbstractModels import DateModel


class Form(DateModel):
    """
    Form Model
    """
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=70, unique=True, null=False)
    content = JSONField(default=None, null=True)

    def __str__(self):
        return "Foo: " + str(self.id)

    class Meta:
        db_table = 'forms_form'
        ordering = ['-id']
