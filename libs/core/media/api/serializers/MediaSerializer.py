from libs.core.media.api.models.Media import Media
from webdjango.serializers.MongoSerializer import DocumentSerializer

class MediaSerializer(DocumentSerializer):
    """
    The Media Serializer
    """
    class Meta:
        model = Media
        fields = '__all__'


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
