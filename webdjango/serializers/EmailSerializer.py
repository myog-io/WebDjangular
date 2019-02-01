from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer
from webdjango.models.Email import Email


class EmailSerializer(WebDjangoSerializer):
    """
    The serializer for Websites
    """
    class Meta:
        model = Email
        fields = '__all__'
