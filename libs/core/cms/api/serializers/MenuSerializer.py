from libs.core.cms.api.models.Menu import Menu, MenuItem
from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer
from rest_framework_json_api.relations import ResourceRelatedField


class MenuSerializer(WebDjangoSerializer):
    """
    The serializer for Menu Objects
    """
    menu_item = ResourceRelatedField(
        many=True,
        queryset=MenuItem.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='menu-relationships'
    )

    included_serializers = {
        'menu_item': 'libs.core.cms.api.serializers.MenuItemSerializer.MenuItemSerializer',
    }


    class Meta:
        model = Menu
        fields = '__all__'
