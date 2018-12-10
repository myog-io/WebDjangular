from django.core.exceptions import ValidationError as DjangoValidationError
from djongo.models.fields import ArrayModelField, ArrayReferenceField, \
    EmbeddedModelField
from rest_framework.exceptions import ErrorDetail, ValidationError
from rest_framework.fields import CreateOnlyDefault, CurrentUserDefault, \
    SkipField, empty, get_error_detail, set_value
from rest_framework.serializers import as_serializer_error
from rest_framework.settings import api_settings
from rest_framework.utils import html, model_meta, representation
from rest_framework_json_api import serializers
from rest_framework_json_api.serializers import empty
from rest_framework_json_api.utils import get_included_resources, \
    get_included_serializers, get_resource_type_from_instance, \
    get_resource_type_from_model, get_resource_type_from_serializer

import collections
import copy
import traceback
from collections import Mapping, OrderedDict


class ArrayModelFieldSerializer(serializers.ListField):

    def __init__(self,serializer, *args, **kwargs):
        self.serializer = serializer
        if self.serializer:
            self.child = self.serializer()
        super(ArrayModelFieldSerializer, self).__init__(*args, **kwargs)


    def to_internal_value(self, data):
        """
        List of dicts of native values <- List of dicts of primitive datatypes.
        """
        data = super(ArrayModelFieldSerializer, self).to_internal_value(data)

        for idx, item in enumerate(data):
            serializer = self.serializer(data=item)
            if serializer.is_valid():
                data[idx] = serializer.save()

        return data

    def to_representation(self, data):
        """
        List of object instances -> List of dicts of primitive datatypes.
        """

        for idx, item in enumerate(data):
            serializer = self.serializer(item)
            data[idx] = serializer.data

        return data
        #return [self.child.to_representation(item) if item is not None else None for item in data]

class ArrayReferenceFieldSerializer(serializers.ListField):
    """
    A List Serializers of Arrays
    """
    child = serializers.IntegerField()
    def __init__(self,serializer, *args, **kwargs):
        self.serializer = serializer

        super(ArrayReferenceFieldSerializer, self).__init__(*args, **kwargs)

    def to_internal_value(self, data):
        """
        List of dicts of native values <- List of dicts of primitive datatypes.
        """
        data = super(ArrayReferenceFieldSerializer, self).to_internal_value(data)
        return data

    def to_representation(self, data):
        """
        List of object instances -> List of dicts of primitive datatypes.
        """
        return [self.child.to_representation(item.pk) if item is not None else None for item in data.all()]

class EmbeddedModelFieldSerializer(serializers.JSONField):

    def __init__(self,serializer, *args, **kwargs):
        self.binary = kwargs.pop('binary', False)
        self.serializer = serializer
        super(EmbeddedModelFieldSerializer, self).__init__(*args, **kwargs)

    def to_internal_value(self, data):
        data = super(EmbeddedModelFieldSerializer, self).to_internal_value(data)
        serializer = self.serializer(data=data)
        if serializer.is_valid():
            return serializer.save()
        return None

    def to_representation(self, value):
        serializer = self.serializer(value)
        value = super(EmbeddedModelFieldSerializer, self).to_representation(serializer.data)

        return value

class EmbeddedSerializer(serializers.ModelSerializer):
    """
    A DocumentSerializer adjusted to have extended control over serialization and validation of EmbeddedDocuments.
    """

    def create(self, validated_data):
        """
        EmbeddedDocuments are not saved separately, so we create an instance of it.
        """
        ModelClass = self.Meta.model
        instance = ModelClass(**validated_data)

        return instance

    def get_fields(self):
        """
        Returns a dictionary of {field_name: field_instance}.
        """
        # Every new serializer is created with a clone of the field instances.
        # This allows users to dynamically modify the fields on a serializer
        # instance without affecting every other serializer instance.
        return copy.deepcopy(self._declared_fields)

    def get_validators(self):
        """
        Returns a list of validator callables.
        """
        # Used by the lazily-evaluated `validators` property.
        meta = getattr(self, 'Meta', None)
        validators = getattr(meta, 'validators', None)
        return validators[:] if validators else []




class DocumentSerializer(serializers.ModelSerializer):
    """
    A Document Serializer For Nested Documents
    """
    def update_validated_data(self,validated_data,info):
        for field_name, field in info.fields.items():
            # Loop For Embbedded Model Field
            if type(field) is EmbeddedModelField:
                if(field_name in validated_data):
                    validated_data[field_name] = field.to_python(validated_data[field_name])

            # Loop for Array Model Field
            if type(field) is ArrayModelField:
                if(field_name in validated_data):
                    validated_data[field_name] = field.to_python(validated_data[field_name])
                else:
                    validated_data[field_name] = []

            if type(field) is ArrayReferenceField:
                if(field_name in validated_data):
                    validated_data[field_name] = field.to_python(validated_data[field_name])
                else:
                    validated_data[field_name] = []

        return validated_data

    def create(self, validated_data):
        """
        Create an instance using queryset.create()
        Before create() on self, call EmbeddedDocumentSerializer's create() first. If exists.
        """
        ModelClass = self.Meta.model

        # Remove many-to-many relationships from validated_data.
        # They are not valid arguments to the default `.create()` method,
        # as they require that the instance has already been saved.
        info = model_meta.get_field_info(ModelClass)
        many_to_many = {}
        for field_name, relation_info in info.relations.items():
            # If is Embbed Model Field we will treat on the next loop
            if (field_name in validated_data):
                if relation_info.to_many and type(info.fields[field_name]) is not EmbeddedModelField:
                    many_to_many[field_name] = validated_data.pop(field_name)

        validated_data = self.update_validated_data(validated_data,info)

        try:
            print(validated_data)
            instance = ModelClass.objects.create(**validated_data)
        except TypeError:
            tb = traceback.format_exc()
            msg = (
                'Got a `TypeError` when calling `%s.objects.create()`. '
                'This may be because you have a writable field on the '
                'serializer class that is not a valid argument to '
                '`%s.objects.create()`. You may need to make the field '
                'read-only, or override the %s.create() method to handle '
                'this correctly.\nOriginal exception was:\n %s' %
                (
                    ModelClass.__name__,
                    ModelClass.__name__,
                    self.__class__.__name__,
                    tb
                )
            )
            raise TypeError(msg)

        # Save many-to-many relationships after the instance is created.
        if many_to_many:
            for field_name, value in many_to_many.items():
                field = getattr(instance, field_name)
                field.set(value)

        return instance


    def update(self, instance, validated_data):

        info = model_meta.get_field_info(instance)
        validated_data = self.update_validated_data(validated_data,info)
        # Simply set each attribute on the instance, and then save it.
        # Note that unlike `.create()` we don't need to treat many-to-many
        # relationships as being a special case. During updates we already
        # have an instance pk for the relationships to be associated with.
        for attr, value in validated_data.items():
            if attr in info.relations and info.relations[attr].to_many:
                field = getattr(instance, attr)
                field.set(value)
            else:
                setattr(instance, attr, value)
        instance.save()

        return instance
