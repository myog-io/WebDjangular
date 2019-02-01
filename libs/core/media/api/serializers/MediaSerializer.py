from libs.core.media.api.models.Media import Media
from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer
from webdjango.serializers.fields import FileField

class MediaSerializer(WebDjangoSerializer):
    """
    The Media Serializer
    """
    class Meta:
        model = Media
        fields = '__all__'

    file = FileField(max_length=None, allow_empty_file=False, use_url=False)

    def create(self, validated_data):
        # if total_chunks exists that is a chunked upload
        # that means that is the first chunk of the transfer
        # therefore current_chunk can be only 1
        try:
            if validated_data['total_chunks'] != None:
                validated_data['current_chunk'] = 1
        except KeyError:
            validated_data['total_chunks'] = None
            validated_data['current_chunk'] = None

        return Media.objects.create(**validated_data)
