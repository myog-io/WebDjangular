from rest_framework.serializers import ModelSerializer
from libs.core.forms.api.models.Form import Form

class FormSerializer(ModelSerializer):
    """
    The serializer for Forms Objects
    """

    class Meta:
        model = Form
        fields = ('title', 'slug', 'content')


