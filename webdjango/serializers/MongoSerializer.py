
import copy
import collections
from rest_framework_json_api.serializers import empty
from rest_framework.settings import api_settings
from rest_framework.utils import html, model_meta, representation
from rest_framework_json_api import serializers


class ArrayModelField(serializers.ListField):

    def __init__(self, *args, **kwargs):
        self.serializer = kwargs.pop('serializer', True)
        super(ArrayModelField, self).__init__(*args, **kwargs)


    def to_internal_value(self, data):
        """
        List of dicts of native values <- List of dicts of primitive datatypes.
        """
        data = super(ArrayModelField, self).to_internal_value(data)
        if self.serializer:

            for idx, item in enumerate(data):
                serializer = self.serializer(data=item)
                if serializer.is_valid():
                    data[idx] = serializer.save()

        return data

    def to_representation(self, data):
        """
        List of object instances -> List of dicts of primitive datatypes.
        """

        if self.serializer:
            for idx, item in enumerate(data):
                serializer = self.serializer(item)
                data[idx] = serializer.data

        return data
        #return [self.child.to_representation(item) if item is not None else None for item in data]

class EmbeddedSerializer(serializers.Serializer):
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



