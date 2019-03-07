from django.db import models
from webdjango.models.AbstractModels import BaseModel


class Form(BaseModel):
    """
    Form Model
    """
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=70, unique=True, null=False)
    content = JSON(default=None, null=True)

    def __str__(self):
        return "Foo: " + str(self.id)

    class Meta:
        db_table = 'forms_form'
        ordering = ['-created']