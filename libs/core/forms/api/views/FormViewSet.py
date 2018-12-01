from django_filters.filterset import FilterSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from libs.core.forms.api.models.Form import Form
from libs.core.forms.api.serializers.FormSerializer import FormSerializer

class FormFilter(FilterSet):
    class Meta:
        model = Form
        fields = {
            'id': ['in'],
            'title': ['contains', 'exact'],
            'slug': ['contains', 'exact']
        }

class FormViewSet(ModelViewSet):
    """
    Handles:
    Creating Forms
    Retrieve a list of Forms
    Retrieve a specific Form
    Update Forms
    Deleting Forms
    """
    serializer_class = FormSerializer
    queryset = Form.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter, DjangoFilterBackend)
    filter_class = FormFilter
    search_fields = ('title', 'slug')
    permission_classes = ()
