from rest_framework_json_api import serializers

from libs.core.cms.api.models.Page import Page
from rest_framework_json_api.relations import ResourceRelatedField
from libs.core.cms.api.models.Block import Block
from libs.core.cms.api.serializers.BlockSerializer import BlockSerializer


class PageSerializer(serializers.ModelSerializer):
    """
    The serializer for Pages Objects
    """
    header = ResourceRelatedField(
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
        'footer': 'libs.core.cms.api.serializers.BlockSerializer.BlockSerializer'
    }

    class Meta:
        model = Page
        fields = ('title', 'slug', 'content', 'header',
                  'footer', 'created', 'updated')
        read_only = ('create', 'updated', 'header', 'footer')
