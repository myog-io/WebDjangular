from django.utils.functional import empty
from rest_framework_json_api import serializers
# from rest_framework import serializers
from ..signals.WebDjangoSignals import pre_init_serializer, post_init_serializer
from drf_queryfields import QueryFieldsMixin


class WebDjangoSerializer(QueryFieldsMixin, serializers.ModelSerializer):
    """
    A Document Serializer For Nested Documents
    """

    def __init__(self, *args, **kwargs):
        pre_init_serializer.send(
            sender=self.__class__, serializer=self, args=args, kwargs=kwargs)
        super(WebDjangoSerializer, self).__init__(*args, **kwargs)
        post_init_serializer.send(
            sender=self.__class__, serializer=self, args=args, kwargs=kwargs)
