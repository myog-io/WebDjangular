from django.db import models
from django_mysql.models import JSONField
from webdjango.models.CoreConfig import CoreConfigInput
from webdjango.models.AbstractModels import BaseModel

LABEL_POSITION_CHOISES = [
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
    field_type = models.CharField(max_length=255,
        default=CoreConfigInput.FIELD_TYPE_TEXT, choices=CoreConfigInput.CONFIG_FIELD_TYPES)
    required = models.BooleanField(default=False)
    default_value = models.TextField(default=None,null=True, blank=True)
    label_position = models.CharField(max_length=255,
        default='above', choices=LABEL_POSITION_CHOISES)
    element_class = models.CharField(max_length=100, default=None,null=True, blank=True)
    wrapper_class = models.CharField(max_length=100, default=None,null=True, blank=True)
    placeholder = models.CharField(max_length=255, default=None,null=True, blank=True)
    data = JSONField()
    position = models.PositiveIntegerField()
    form = models.ForeignKey(
        'Form', on_delete=models.CASCADE, related_name='fields')

    class Meta:
        db_table = 'cms_form_field'
        ordering = ['position']


class FormAction(BaseModel):
    label = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255)
    action_type = models.CharField(
        max_length=255, default='email', choices=ACTION_CHOISES)
    data = JSONField()
    position = models.PositiveIntegerField()
    form = models.ForeignKey(
        'Form', on_delete=models.CASCADE, related_name='actions')

    class Meta:
        db_table = 'cms_form_action'
        ordering = ['position']


class Form(BaseModel):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255)
    show_title = models.BooleanField(default=True)
    clear_complete = models.BooleanField(default=True)
    hide_complete = models.BooleanField(default=True)

    class Meta:
        db_table = 'cms_form'
        ordering = ['id']

class FormSubmition(BaseModel):
    form = models.ForeignKey(
        'Form', on_delete=models.CASCADE, related_name='submitions')
    data = JSONField(null=False)
    
    class Meta:
        db_table = 'cms_form_submition'
        ordering = ['id']