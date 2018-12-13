from libs.core.cms.api.models.Block import Block
from libs.core.cms.api.models.Page import Page
from libs.core.cms.api.serializers.BlockSerializer import BlockSerializer
from rest_framework_json_api import serializers
from rest_framework_json_api.relations import ResourceRelatedField
from webdjango.serializers.MongoSerializer import DocumentSerializer


class PageSerializer(DocumentSerializer):
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
        fields = '__all__'
        read_only = ('create', 'updated', 'header', 'footer')
