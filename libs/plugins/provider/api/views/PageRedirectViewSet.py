from django_filters.filterset import FilterSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework_json_api.views import ModelViewSet

from ..models.PageRedirect import PageRedirect
from ..serializers.PageRedirectSerializer import PageRedirectSerializer
from rest_framework_json_api.views import RelationshipView
class PageRedirectFilter(FilterSet):
    class Meta:
        model = PageRedirect
        fields = {
            'id': ['in'],
            'default_page': ['in', 'exact'],
            'redirect_page': ['in', 'exact'],
            'cities': ['in', 'exact'],
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
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = PageRedirectFilter
    search_fields = ('id')
    permission_classes = ()


class PageRedirectRelationshipView(RelationshipView):
    queryset = PageRedirect.objects
