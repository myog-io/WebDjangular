from rest_framework_json_api.views import ModelViewSet, RelationshipView

from webdjango.filters import WebDjangoFilterSet

from ..models.PageRedirect import PageRedirect
from ..serializers.PageRedirectSerializer import PageRedirectSerializer


class PageRedirectFilter(WebDjangoFilterSet):
    class Meta:
        model = PageRedirect
        fields = {
            'id': ['in'],
            'default_page': ['exact'],
            'redirect_page': ['exact'],
            'cities': ['exact'],
        }


class PageRedirectViewSet(ModelViewSet):
    """
    Handles:
    Creating Pages
    Retrieve a list of Pages
    Retrieve a specific Page
    Update Pages
    Deleting Pages
    """
    serializer_class = PageRedirectSerializer
    queryset = PageRedirect.objects.all()
    ordering_fields = '__all__'
    filter_class = PageRedirectFilter
    search_fields = ('id')


class PageRedirectRelationshipView(RelationshipView):
    queryset = PageRedirect.objects
