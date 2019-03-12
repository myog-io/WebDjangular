from rest_framework_json_api.views import ModelViewSet, RelationshipView

from libs.core.cms.api.models.Form import (Form, FormAction, FormField,
                                           FormSubmition)
from libs.core.cms.api.serializers.FormSerializer import (FormActionSerializer,
                                                          FormFieldSerializer,
                                                          FormSerializer,
                                                          FormSubmitionSerializer)
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
    ordering_fields = '__all__'
    filter_class = FormFilter
    public_views = ('list', 'retrieve')


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
    serializer_class = FormSubmitionSerializer
    queryset = FormSubmition.objects.all()
    ordering_fields = '__all__'


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
    ordering_fields = '__all__'


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
    ordering_fields = '__all__'


class FormFieldRelationshipView(RelationshipView):
    queryset = FormField.objects.all()
