from django import forms
from django_filters.filters import ModelMultipleChoiceFilter
from rest_framework_json_api.views import ModelViewSet, RelationshipView

from webdjango.filters import WebDjangoFilterSet

from ..models.PlanType import PlanType
from ..serializers.PlanTypeSerializer import PlanTypeSerializer


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
    ordering_fields = '__all__'
    filter_class = PlanTypeFilter
    search_fields = ('name',)
    public_views = ('list', 'retrieve')


class PlanTypeRelationshipView(RelationshipView):
    queryset = PlanType.objects
