from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework import filters, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework_json_api.views import ModelViewSet, RelationshipView


from libs.core.cms.api.models.Form import Form, FormSubmitted, FormField, \
    FormAction
from libs.core.cms.api.serializers.FormSerializer import FormSerializer, \
    FormSubmittedSerializer, FormFieldSerializer, FormActionSerializer
from webdjango.filters import WebDjangoFilterSet


class FormFilter(WebDjangoFilterSet):
    class Meta:
        model = Form
        fields = {
            'id': ['in'],
            'slug': ['in', 'exact'],
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
    filter_backends = (filters.SearchFilter,
                       filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = FormFilter
    permission_classes = ()


class FormRelationshipView(RelationshipView):
    queryset = Form.objects.all()


class FormSubmittedViewSet(ModelViewSet):
    """
    Handles:
    Creating Pages
    Retrieve a list of Pages
    Retrieve a specific Page
    Update Pages
    Deleting Pages
    """
    serializer_class = FormSubmittedSerializer
    queryset = FormSubmitted.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    permission_classes = ()


class FormSubmittedRelationshipView(RelationshipView):
    queryset = FormSubmitted.objects.all()


class FormActionViewSet(ModelViewSet):
    """
    Handles:
    Creating Form Actions
    Retrieve a list of Form Actions
    Retrieve a specific Form Action
    Update Form Actions
    Deleting Form Actions
    """
    serializer_class = FormActionSerializer
    queryset = FormAction.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    permission_classes = ()


class FormActionRelationshipView(RelationshipView):
    queryset = FormAction.objects.all()


class FormFieldViewSet(ModelViewSet):
    """
    Handles:
    Creating Pages
    Retrieve a list of Pages
    Retrieve a specific Page
    Update Pages
    Deleting Pages
    """
    serializer_class = FormFieldSerializer
    queryset = FormField.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    permission_classes = ()


class FormFieldRelationshipView(RelationshipView):
    queryset = FormField.objects.all()
