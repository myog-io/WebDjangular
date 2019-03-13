from rest_framework_json_api.views import ModelViewSet

from webdjango.filters import WebDjangoFilterSet

from ..models.Email import Email
from ..serializers.EmailSerializer import EmailSerializer


class EmailFilter(WebDjangoFilterSet):
    class Meta:
        model = Email
        fields = ('id', 'subject', 'code', 'content')


class EmailViewSet(ModelViewSet):
    """
    ViewSet to view all Core Websites.
    """
    queryset = Email.objects.all()
    serializer_class = EmailSerializer
    search_fields = ('domain', 'code')
    filter_class = EmailFilter
