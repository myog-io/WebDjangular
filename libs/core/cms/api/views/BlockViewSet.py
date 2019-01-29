from webdjango.filters import WebDjangoFilterSet
from django_filters.rest_framework import DjangoFilterBackend
from libs.core.cms.api.models.Block import Block
from libs.core.cms.api.serializers.BlockSerializer import BlockSerializer
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework_json_api.views import ModelViewSet, RelationshipView


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
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = BlockFilter
    permission_classes = ()


class BlockRelationshipView(RelationshipView):
    queryset = Block.objects.all()
