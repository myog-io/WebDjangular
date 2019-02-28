from libs.core.cms.api.models.Form import Form, FormSubmition
from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer
from rest_framework_json_api.relations import ResourceRelatedField

class FormSerializer(WebDjangoSerializer):
    """
    The serializer for Pages Objects
    """
    submitions = ResourceRelatedField(
        many=False,
        queryset=FormSubmition.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='form-relationships',
        required=False,
    )
    included_serializers = {
        'submitions': 'libs.core.cms.api.serializers.FormSerializer.FormSubmitionSerializer',
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