from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.viewsets import ModelViewSet

from webdjangular.core.cms.models.Page import Page
from webdjangular.core.cms.serializers.PageSerializer import PageSerializer


class PageViewSet(ModelViewSet):
    """
    Handles:
    Creating Pages
    Retrieve a list of Pages
    Retrieve a specific Page
    Update Pages
    Deleting Pages
    """
    resource_name = 'page'
    serializer_class = PageSerializer
    queryset = Page.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title', 'content','slug')
    permission_classes = ()
















