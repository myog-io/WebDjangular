from libs.core.cms.api.models.Block import Block
from webdjango.serializers.MongoSerializer import DocumentSerializer

class BlockSerializer(DocumentSerializer):
    """
    The serializer for Pages Objects
    """

    class Meta:
        model = Block
        fields = '__all__'
