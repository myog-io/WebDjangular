from django.db import models
from django.contrib.postgres.fields import JSONField
from webdjango.signals.CoreSignals import config_group_register, config_register
from webdjango.models.Core import CoreConfig
from json.encoder import JSONEncoder
# TODO: Implement Permissions based on Groups

class AbstractCoreConfigModel(models.Model):
    id = models.SlugField(null=False, primary_key=True)

    class Meta:
        abstract = True

    def __str__(self):
        return self.id


class CoreConfigGroup(AbstractCoreConfigModel):
    '''
    This is the Agroupment inside the Admin Panel that will devide the Groups of Each Core Configuration
    If anything is changed inside this Model, is also necessary to change inside the CoreConfigGroupSerializer as well
    '''
    order = models.IntegerField(default=0)
    title = models.CharField(default=None)

    @property
    def value(self):
        return CoreConfig.read(self.id)

    @staticmethod
    def get(pk=None):
        groups = CoreConfigGroup.all()
        for group in groups:
            if group.id == pk:
                return group
        return None

    @staticmethod
    def all():
        registers = config_group_register.send_robust(sender=CoreConfigGroup)
        groups = []
        flat_list = [item for sublist in registers for item in sublist]
        groups += filter(lambda obj: type(obj) == CoreConfigGroup, flat_list)
        groups = sorted(groups, key=lambda obj: obj.order)
        return groups

    class Meta:
        abstract = True


    def __str__(self):
        return self.id


class CoreConfigInput(AbstractCoreConfigModel):
    '''
    This is responsable for the Fields and how they will be interpreted in the frontend application
    If anything is changed inside this Model, is also necessary to change inside the CoreConfigGroupSerializer as well
    '''
    FIELD_TYPE_BUTTON = 'button'
    FIELD_TYPE_TEXT = 'text'
    FIELD_TYPE_SELECT = 'select'
    FIELD_TYPE_CKEDITOR = 'ckeditor'
    FIELD_TYPE_CODE_EDITOR = 'codeEditor'

    CONFIG_FIELD_TYPES = {
        (FIELD_TYPE_BUTTON, 'Button'),
        (FIELD_TYPE_TEXT, 'Text'),
        (FIELD_TYPE_SELECT, 'Select'),
        (FIELD_TYPE_CKEDITOR, 'CkEditor'),
        (FIELD_TYPE_CODE_EDITOR, 'CodeEditor'),
    }
    field_type = models.CharField(default=None, choices=CONFIG_FIELD_TYPES)
    input_type = models.CharField(default=None)
    order = models.IntegerField(default=0)
    disabled = models.BooleanField(default=False)
    label = models.CharField(default=None)
    select_options = JSONField(default=None)
    select_options_model = models.CharField(default=None)
    placeholder = models.CharField(default=None)
    validation = JSONField(default=None)
    wrapper_class = models.CharField(default=None)
    group = models.SlugField(null=False)
    conditional = JSONField(default=None)

    @property
    def value(self):
        return CoreConfig.read(self.config_path)

    @property
    def config_path(self):
        if self.group:
            return '{}.{}'.format(self.group, self.id)
        return self.id

    @staticmethod
    def all():
        registers = config_register.send_robust(sender=CoreConfigInput)
        inputs = []
        flat_list = [item for sublist in registers for item in sublist]
        for register in flat_list:
            if type(register) == list:
                inputs += filter(lambda obj:
                                 type(obj) == CoreConfigInput, register)
        inputs = sorted(inputs, key=lambda obj: obj.order)
        return inputs

    class Meta:
        abstract = True


    def __str__(self):
        return self.id
