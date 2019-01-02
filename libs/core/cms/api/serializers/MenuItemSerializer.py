from libs.core.cms.api.models.Menu import Menu, MenuItem
from rest_framework_json_api.relations import ResourceRelatedField
from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer


class MenuItemSerializer(WebDjangoSerializer):
    """
    The serializer for Menu Objects
    """
    parent = ResourceRelatedField(
        many=False,
        queryset=MenuItem.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='menu-relationships',
        required=False,
    )
    children = ResourceRelatedField(
        many=True,
        queryset=MenuItem.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='menu-relationships',
        required=False,
    )
    menu = ResourceRelatedField(
        many=False,
        queryset=Menu.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='menu-relationships'
    )

    included_serializers = {
        'parent': 'libs.core.cms.api.serializers.MenuItemSerializer.MenuItemSerializer',
        'children': 'libs.core.cms.api.serializers.MenuItemSerializer.MenuItemSerializer',
        'menu': 'libs.core.cms.api.serializers.MenuSerializer.MenuSerializer',

    }

    class Meta:
        model = MenuItem
        fields = '__all__'
