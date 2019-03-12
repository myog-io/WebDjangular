
from rest_framework_json_api.views import ModelViewSet, RelationshipView

from libs.core.cms.api.models.Block import Block
from libs.core.cms.api.serializers.BlockSerializer import BlockSerializer
from webdjango.filters import WebDjangoFilterSet


class BlockFilter(WebDjangoFilterSet):
    class Meta:
        model = Block
        fields = {
            'id': ['in'],
            'block_class': ['in', 'exact'],
            'title': ['contains', 'exact'],
            'slug': ['contains', 'exact'],
            'content': ['contains'],
        }


class BlockViewSet(ModelViewSet):
    """
    Handles:
    Creating Pages
    Retrieve a list of Pages
    Retrieve a specific Page
    Update Pages
    Deleting Pages
    """
    serializer_class = BlockSerializer
    queryset = Block.objects.all()
    ordering_fields = '__all__'
    filter_class = BlockFilter
    public_views = ('list', 'retrieve')


class BlockRelationshipView(RelationshipView):
    queryset = Block.objects.all()
