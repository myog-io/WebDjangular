from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED
from rest_framework_json_api.views import ModelViewSet, RelationshipView

from libs.core.cms.api.models.Form import (Form, FormAction, FormField,
                                           FormSubmitted)
from libs.core.cms.api.serializers.FormSerializer import (
    FormActionSerializer, FormFieldSerializer, FormSerializer,
    FormSubmittedSerializer)
from webdjango.filters import WebDjangoFilterSet
from webdjango.utils import get_client_ip


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
    serializer_class = FormSubmittedSerializer
    queryset = FormSubmitted.objects.all()
    ordering_fields = '__all__'
    public_views = ('create')

    """
    Create a model instance.
    """

    def create(self, request, *args, **kwargs):
        # Appending Request Meta to the Data
        meta = {
            'REMOTE_ADDR': get_client_ip(request),
            'HTTP_REFERER': request.META.get('HTTP_REFERER'),
            'HTTP_USER_AGENT': request.META.get('HTTP_USER_AGENT'),
            'REMOTE_HOST': request.META.get('REMOTE_HOST'),
            'REMOTE_USER': request.META.get('REMOTE_USER'),
            'SERVER_NAME': request.META.get('SERVER_NAME'),
            'SERVER_PORT': request.META.get('SERVER_PORT'),
        }
        request.data['data']['meta'] = meta
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=HTTP_201_CREATED, headers=headers)


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
