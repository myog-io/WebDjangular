from django.db import models
from djongo.models.json import JSONField


class CoreConfigInterface(models.Model):
    FIELD_TYPE_BUTTON = 'button'
    FIELD_TYPE_INPUT = 'input'
    FIELD_TYPE_SELECT = 'select'
    FIELD_TYPE_CKEDITOR = 'ckeditor'
    FIELD_TYPE_CODE_EDITOR = 'codeEditor'

    CONFIG_FIELD_TYPES = {
        (FIELD_TYPE_BUTTON, 'Button'),
        (FIELD_TYPE_INPUT, 'TextField'),
        (FIELD_TYPE_SELECT, 'Select'),
        (FIELD_TYPE_CKEDITOR, 'CkEditor'),
        (FIELD_TYPE_CODE_EDITOR, 'CodeEditor'),
    }
    id = models.CharField(null=False)
    field_type = models.CharField(default=None,choices=CONFIG_FIELD_TYPES)
    input_type = models.CharField(default=None)
    order = models.IntegerField(default=0)
    disabled = models.BooleanField(default=False)
    label = models.CharField(default=None)
    select_options = JSONField(default=None)
    placeholder = models.CharField(default=None)
    validation = JSONField(default=None)
    wrapperClass = models.CharField(default=None)
    group = models.SlugField(default=None)


    class Meta:
        abstract = True
