from ..models.Channel import Channel
from ..serializers.ChannelSerializer import ChannelSerializer
from django_filters.filterset import FilterSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework_json_api.views import ModelViewSet
from rest_framework_json_api.views import RelationshipView


class ChannelFilter(FilterSet):
    class Meta:
        model = Channel
        fields = {
            'id': ['in'],
            'name': ['in','contains', 'exact'],
            'number': ['in']
        }


class ChannelViewSet(ModelViewSet):
    """
    Handles:
    Creating Cities
    Retrieve a list of Cities
    Retrieve a specific City
    Update City
    Deleting Cities
    """
    serializer_class = ChannelSerializer
    queryset = Channel.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = ChannelFilter
    search_fields = ('name')
    permission_classes = ()



class ChannelRelationshipView(RelationshipView):
    queryset = Channel.objects
