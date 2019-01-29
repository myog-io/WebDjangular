from django import forms
from webdjango.filters import WebDjangoFilterSet
from django_filters.filters import ModelMultipleChoiceFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework_json_api.views import ModelViewSet
from rest_framework_json_api.views import RelationshipView

from ..models.Channel import Channel
from ..serializers.ChannelSerializer import ChannelSerializer
from ....store.api.models.Product import Product


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
    search_fields = ('name',)
    permission_classes = ()


class ChannelRelationshipView(RelationshipView):
    queryset = Channel.objects
