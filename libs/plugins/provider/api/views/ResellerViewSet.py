from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_json_api.views import ModelViewSet, RelationshipView

from webdjango.filters import WebDjangoFilterSet

from ..models.Reseller import Reseller
from ..serializers.ResellerSerializer import ResellerSerializer


class ResellerFilter(WebDjangoFilterSet):
    class Meta:
        model = Reseller
        fields = {
            'id': ['in'],
            'name': ['contains', 'exact'],
            'email': ['contains', 'exact'],
            'active': ['exact']
        }


class ResellerViewSet(ModelViewSet):
    """
    Handles:
    Creating Cities
    Retrieve a list of Cities
    Retrieve a specific City
    Update City
    Deleting Cities
    """
    serializer_class = ResellerSerializer
    queryset = Reseller.objects
    ordering_fields = '__all__'
    filter_class = ResellerFilter
    search_fields = ('name')
    public_views = ('list', 'retrieve','by_taxvat')

    @action(methods=['GET'], detail=True, url_path='by_taxvat')
    def by_taxvat(self, request, *args, **kwargs):
        '''
        Get the Details of an order by order token
        '''
        self.lookup_url_kwarg = 'pk'
        self.lookup_field = 'taxvat'
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class ResellerRelationshipView(RelationshipView):
    queryset = Reseller.objects
