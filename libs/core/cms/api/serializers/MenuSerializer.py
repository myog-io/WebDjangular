from libs.core.cms.api.models.Menu import Menu
from webdjango.serializers.MongoSerializer import DocumentSerializer

class MenuSerializer(DocumentSerializer):
    """
    The serializer for Menu Objects
    """

    class Meta:
        model = Menu
        fields = '__all__'
