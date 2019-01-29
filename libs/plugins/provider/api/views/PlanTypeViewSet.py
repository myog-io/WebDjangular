from django import forms
from webdjango.filters import WebDjangoFilterSet
from django_filters.filters import ModelMultipleChoiceFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework_json_api.views import ModelViewSet
from rest_framework_json_api.views import RelationshipView

from ..models.PlanType import PlanType
from ..serializers.PlanTypeSerializer import PlanTypeSerializer
from ....store.api.models.Product import Product


class PlanTypeFilter(WebDjangoFilterSet):
    products = ModelMultipleChoiceFilter(
        queryset=PlanType.objects.all(),
        widget=forms.CheckboxSelectMultiple
    )

    class Meta:
        model = PlanType
        fields = {
            'id': ['in'],
            'name': ['in', 'contains', 'exact'],
        }


class PlanTypeViewSet(ModelViewSet):
    """
    Handles:
    Creating Cities
    Retrieve a list of Cities
    Retrieve a specific City
    Update City
    Deleting Cities
    """
    serializer_class = PlanTypeSerializer
    queryset = PlanType.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter,
                       filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = PlanTypeFilter
    search_fields = ('name',)
    permission_classes = ()


class PlanTypeRelationshipView(RelationshipView):
    queryset = PlanType.objects