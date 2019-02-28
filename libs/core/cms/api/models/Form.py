from django.db import models
from django_mysql.models import JSONField
from webdjango.models.CoreConfig import CoreConfigInput
from webdjango.models.AbstractModels import BaseModel

LABEL_POSITION_CHOISES = [
    ('default', 'default'),
    ('above', 'above'),
    ('below', 'below'),
]

ACTION_CHOISES = [
    ('email', 'email'),
    ('save', 'save')
]


class FormField(BaseModel):

    label = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255)
    type = models.CharField(
        default=CoreConfigInput.FIELD_TYPE_TEXT, choices=CoreConfigInput.CONFIG_FIELD_TYPES)
    required = models.BooleanField(default=False)
    default_value = models.TextField()
    label_position = models.CharField(
        default='text', choices=CoreConfigInput.CONFIG_FIELD_TYPES)
    data = JSONField()

    class Meta:
        abstract = True
        


class FormAction(BaseModel):
    label = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255)
    action_type = models.CharField(default='email', choices=ACTION_CHOISES)
    data = JSONField()

    class Meta:
        abstract = True


class Form(BaseModel):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255)
    show_title = models.BooleanField(default=True)
    clear_complete = models.BooleanField(default=True)
    hide_complete = models.BooleanField(default=True)
    fields = JSONField(null=True, default=None, blank=True)
    actions = JSONField(null=True, default=None, blank=True)

    class Meta:
        ordering = ['id']

class FormSubmition(BaseModel):
    form = models.ForeignKey(
        'Form', on_delete=models.CASCADE, related_name='submitions')
    data = JSONField(null=False)
    
    class Meta:
        ordering = ['id']