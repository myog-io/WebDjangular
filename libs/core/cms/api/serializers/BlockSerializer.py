from libs.core.cms.api.models.Block import Block
from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer

class BlockSerializer(WebDjangoSerializer):
    """
    The serializer for Pages Objects
    """

    class Meta:
        model = Block
        fields = '__all__'
