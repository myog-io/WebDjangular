from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.viewsets import ViewSet

from ..models.Page import Page
from ..serializers.PageSerializer import PageSerializer


class PageViewSet(ViewSet):
    """
    Handles:
    Creating Pages
    Retrieve a list of Pages
    Retrieve a specific Page
    Update Pages
    Deleting Pages
    """
    
    serializer_class = PageSerializer
    queryset = Page.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = ()
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title', 'content')















