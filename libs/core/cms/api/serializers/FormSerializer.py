from libs.core.cms.api.models.Form import Form, FormSubmition, FormAction, FormField
from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer
from rest_framework_json_api.relations import ResourceRelatedField


class FormActionSerializer(WebDjangoSerializer):
    form = ResourceRelatedField(
        many=False,
        queryset=Form.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='form-action-relationships',
        required=False,
    )
    included_serializers = {
        'form': 'libs.core.cms.api.serializers.FormSerializer.FormSerializer',
    }

    class Meta:
        model = FormAction
        fields = '__all__'


class FormFieldSerializer(WebDjangoSerializer):
    form = ResourceRelatedField(
        many=False,
        queryset=Form.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='form-field-relationships',
        required=False,
    )
    included_serializers = {
        'form': 'libs.core.cms.api.serializers.FormSerializer.FormSerializer',
    }

    class Meta:
        model = FormField
        fields = '__all__'


class FormSerializer(WebDjangoSerializer):
    """
    The serializer for Pages Objects
    """
    submitions = ResourceRelatedField(
        many=True,
        queryset=FormSubmition.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='form-relationships',
        required=False,
    )
    actions = ResourceRelatedField(
        many=True,
        queryset=FormAction.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='form-relationships',
        required=False,
    )
    fields = ResourceRelatedField(
        many=True,
        queryset=FormField.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='form-relationships',
        required=False,
    )
    

    included_serializers = {
        'submitions': 'libs.core.cms.api.serializers.FormSerializer.FormSubmitionSerializer',
        'actions': 'libs.core.cms.api.serializers.FormSerializer.FormActionSerializer',
        'fields': 'libs.core.cms.api.serializers.FormSerializer.FormFieldSerializer',
    }

    class Meta:
        model = Form
        fields = '__all__'


class FormSubmitionSerializer(WebDjangoSerializer):
    """
    The serializer for Pages Objects
    """
    form = ResourceRelatedField(
        many=False,
        queryset=Form.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='form-submition-relationships',
        required=False,
    )
    
    included_serializers = {
        'form': 'libs.core.cms.api.serializers.FormSerializer.FormSerializer',
    }

    class Meta: 
        model = FormSubmition
        fields = '__all__'
