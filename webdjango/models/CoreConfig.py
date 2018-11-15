from django.db import models
from djongo.models.json import JSONField
from webdjango.signals.CoreSignals import config_group_register, config_register
# TODO: Implement Permissions based on Groups


class CoreConfigGroup(models.Model):
    id = models.SlugField(null=False)
    order = models.IntegerField(default=0)

    @staticmethod
    def get(pk=None):
        groups = CoreConfigGroup.all()
        # LOOP TO FILTER GROUP
        groups = filter(lambda obj: obj.id == pk, groups)
        groups = sorted(groups, key='order')
        return list(groups)

    @staticmethod
    def all():
        registers = config_group_register.send_robust(sender=CoreConfigGroup)
        groups = []
        for register in registers:
            groups += filter(lambda obj: type(obj) == CoreConfigGroup , list(register) )

        groups = sorted(groups, key=lambda obj: obj.order)

        return groups

    def inputs(self):
        inputs = CoreConfigGroup.all()
        inputs = filter(lambda obj: obj.group == self, inputs)
        inputs = sorted(inputs, key='order')
        return list(inputs)


    class Meta:
        abstract = True
        permissions = (("list_core_config_group",
                        "Can list Core Config Group Interface"),)

    def __str__(self):
        return self.id


class CoreConfigInput(models.Model):
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
    id = models.SlugField(null=False)
    field_type = models.CharField(default=None, choices=CONFIG_FIELD_TYPES)
    input_type = models.CharField(default=None)
    order = models.IntegerField(default=0)
    disabled = models.BooleanField(default=False)
    label = models.CharField(default=None)
    select_options = JSONField(default=None)
    placeholder = models.CharField(default=None)
    validation = JSONField(default=None)
    wrapperClass = models.CharField(default=None)
    group = models.SlugField(null=False)

    @staticmethod
    def all():
        groups = config_group_register.send_robust(sender=CoreConfigInput)
        return groups

    class Meta:
        abstract = True
        permissions = (("list_core_config_input",
                        "Can list Core Config Input Interface"),)

    def __str__(self):
        return self.id
