from django_filters.filterset import FilterSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from libs.core.cms.api.models.Page import Page
from libs.core.cms.api.serializers.PageSerializer import PageSerializer
from webdjango.configs import CONFIG_HOME_PAGE
from webdjango.models.Core import CoreConfig


class PageFilter(FilterSet):
    class Meta:
        model = Page
        fields = {
            'id': ['in'],
            'title': ['contains', 'exact'],
            'slug': ['contains', 'exact'],
            'content': ['contains'],
        }


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
    filter_backends = (filters.SearchFilter, DjangoFilterBackend)
    filter_class = PageFilter
    search_fields = ('title', 'content', 'slug')
    permission_classes = ()

    @action(methods=['GET'], detail=False, url_path='get_home')
    def get_home(self, request, format=None):
        """
        Return the Home Page
        """
        serializer = PageSerializer(
            Page.objects.get(
                pk=CoreConfig.read(slug=CONFIG_HOME_PAGE,
                                   website=request.website)
            )
        )

        return Response(serializer.data)
