from libs.core.cms.api.models.Menu import MenuItem
from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer

class MenuItemSerializer(WebDjangoSerializer):
    """
    The serializer for Menu Objects
    """

    class Meta:
        model = MenuItem
        fields = '__all__'
