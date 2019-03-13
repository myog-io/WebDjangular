from django.db import models
from django_mysql.models import JSONField

from webdjango.models.AbstractModels import BaseModel
from webdjango.models.CoreConfig import CoreConfigInput

LABEL_POSITION_CHOICES = [
    ('above', 'above'),
    ('below', 'below'),
]

ACTION_CHOICES = [
    ('send_email', 'send_email'),
]


class FormField(BaseModel):
    label = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255)
    field_type = models.CharField(max_length=255,
                                  default=CoreConfigInput.FIELD_TYPE_TEXT,
                                  choices=CoreConfigInput.CONFIG_FIELD_TYPES)
    input_type = models.CharField(max_length=55, blank=True, null=True)
    required = models.BooleanField(default=False)
    default_value = models.TextField(default=None, null=True, blank=True)
    label_position = models.CharField(max_length=255,
                                      default='above',
                                      choices=LABEL_POSITION_CHOICES)
    element_class = models.CharField(max_length=100, default=None, null=True,
                                     blank=True)
    wrapper_class = models.CharField(max_length=100, default=None, null=True,
                                     blank=True)
    placeholder = models.CharField(max_length=255, default=None, null=True,
                                   blank=True)
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
        max_length=255, default='send_email', choices=ACTION_CHOICES)
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
    success_message = models.CharField(blank=True, null=True, max_length=255)
    error_message = models.CharField(blank=True, null=True, max_length=255)
    error_required = models.CharField(blank=True, null=True, max_length=255)
    error_email = models.CharField(blank=True, null=True, max_length=255)
    error_date = models.CharField(blank=True, null=True, max_length=255)
    error_match = models.CharField(blank=True, null=True, max_length=255)
    error_min_length = models.CharField(blank=True, null=True, max_length=255)
    error_max_length = models.CharField(blank=True, null=True, max_length=255)
    error_invalid = models.CharField(blank=True, null=True, max_length=255)
    error_validation = models.CharField(blank=True, null=True, max_length=255)
    error_honeypot = models.CharField(blank=True, null=True, max_length=255)

    class Meta:
        db_table = 'cms_form'
        ordering = ['id']


class FormSubmitted(BaseModel):
    form = models.ForeignKey(
        'Form', on_delete=models.CASCADE, related_name='forms_submitted')
    data = JSONField(null=False)

    class Meta:
        db_table = 'cms_form_submitted'
        ordering = ['id']
