from rest_framework_json_api import serializers
from libs.core.forms.api.models.Form import Form

class FormSerializer(serializers.ModelSerializer):
    """
    The serializer for Forms Objects
    """

    class Meta:
        model = Form
        fields = '__all__'
        read_only = ('created', 'updated')


