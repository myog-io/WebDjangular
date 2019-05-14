from django import forms
from django_filters.filters import ModelMultipleChoiceFilter
from rest_framework_json_api.views import ModelViewSet, RelationshipView

from webdjango.filters import WebDjangoFilterSet

from ....store.api.models.Product import Product
from ..models.Channel import Channel
from ..serializers.ChannelSerializer import ChannelSerializer
from webdjango.views.CoreViewSet import CachedModelViewSet

class ChannelFilter(WebDjangoFilterSet):
    products = ModelMultipleChoiceFilter(
        queryset=Product.objects.all(),
        widget=forms.CheckboxSelectMultiple
    )

    class Meta:
        model = Channel
        fields = {
            'id': ['in'],
            'name': ['in', 'contains', 'exact'],
            'number': ['in']
        }


class ChannelViewSet(CachedModelViewSet):
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
    ordering_fields = '__all__'
    filter_class = ChannelFilter
    search_fields = ('name',)
    public_views = ('list', 'retrieve')


class ChannelRelationshipView(RelationshipView):
    queryset = Channel.objects
