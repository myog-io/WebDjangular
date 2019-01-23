from libs.core.cms.api.models.Block import Block
from libs.core.cms.api.models.Page import Page, PageTag, PageCategory
from libs.core.cms.api.serializers.BlockSerializer import BlockSerializer
from rest_framework_json_api import serializers
from rest_framework_json_api.relations import ResourceRelatedField
from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer


class PageTagSerializer(WebDjangoSerializer):
    """
    The serializer for Page Tag Objects
    """

    class Meta:
        model = PageTag
        fields = '__all__'
        read_only = ('create', 'updated')


class PageCategorySerializer(WebDjangoSerializer):
    """
    The serializer for Page Category Objects
    """

    class Meta:
        model = PageCategory
        fields = '__all__'
        read_only = ('create', 'updated')


class PageSerializer(WebDjangoSerializer):
    """
    The serializer for Pages Objects
    """
    header = ResourceRelatedField(
        many=False,
        queryset=Block.objects,

        related_link_url_kwarg='pk',
        self_link_view_name='page-relationships'
    )
    layout = ResourceRelatedField(
        many=False,
        queryset=Block.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='page-relationships'
    )
    footer = ResourceRelatedField(
        many=False,
        queryset=Block.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='page-relationships'
    )

    included_serializers = {
        'header': 'libs.core.cms.api.serializers.BlockSerializer.BlockSerializer',
        'layout': 'libs.core.cms.api.serializers.BlockSerializer.BlockSerializer',
        'footer': 'libs.core.cms.api.serializers.BlockSerializer.BlockSerializer'
    }

    class Meta:
        model = Page
        fields = '__all__'
        read_only = ('create', 'updated')
