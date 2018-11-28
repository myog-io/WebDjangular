from rest_framework.serializers import ModelSerializer

from libs.core.cms.api.models.Block import Block


class BlockSerializer(ModelSerializer):
    """
    The serializer for Pages Objects
    """

    class Meta:
        model = Block
        fields = '__all__'
