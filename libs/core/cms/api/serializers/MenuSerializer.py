from libs.core.cms.api.models.Menu import Menu
from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer

class MenuSerializer(WebDjangoSerializer):
    """
    The serializer for Menu Objects
    """

    class Meta:
        model = Menu
        fields = '__all__'
