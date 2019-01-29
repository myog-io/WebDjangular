from webdjango.filters import WebDjangoFilterSet
from django_filters.filters import ModelChoiceFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework_json_api.views import ModelViewSet, RelationshipView
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import exceptions
from ..models.City import PostalCodeRange, Street, NumberRange
from ..serializers.CitySerializer import PostalCodeRangeSerializer,\
    StreetSerializer,  NumberRangeSerializer
from ..models.City import City
from ..serializers.CitySerializer import CitySerializer
from ..utils import getClientUserCookie
from libs.plugins.store.api.models.Product import Product
import requests
import json


class CityFilter(WebDjangoFilterSet):
    products = ModelChoiceFilter(queryset=Product.objects.all())

    class Meta:
        model = City
        fields = {
            'id': ['in', 'exact'],
            'name': ['contains', 'exact'],
            'short_name': ['contains', 'exact'],
            'code': ['contains', 'exact'],

        }


class CityViewSet(ModelViewSet):
    """
    Handles:
    Creating Cities
    Retrieve a list of Cities
    Retrieve a specific City
    Update City
    Deleting Cities
    """
    serializer_class = CitySerializer
    queryset = City.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter,
                       filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = CityFilter
    search_fields = ('name',)
    permission_classes = ()

    @action(methods=['GET'], detail=True, url_path='postal_code', lookup_field='postal_code', lookup_url_kwarg='postal_code')
    def postal_code(self, request, *args, **kwargs):
        assert 'pk' in self.kwargs, (
            'Expected view %s to be called with a URL keyword argument '
            'named "%s". Fix your URL conf, or set the `.lookup_field` '
            'attribute on the view correctly.' %
            (self.__class__.__name__, 'pk')
        )
        # TODO: Correct Way wold be, Search on Our Database First, On the CEP Range, If we Don't Find Search on viacep.com.br, If We Find We Update Our Database and Send to the User
        # For now we will only search on viacep.com and cross reference with our information

        postal_code = self.kwargs['pk']
        r = requests.get(
            'http://viacep.com.br/ws/{0}/json/'.format(postal_code))

        city_data = json.loads(r.text)
        if 'erro' in city_data:
            raise exceptions.NotFound("Cep Não encontrado ou invalido")
        city = None
        if city_data['localidade']:
            # Distrito de Potunduva (Potunduva)
            if city_data['bairro'] and city_data['bairro'].lower().find('Distrito') is not -1:
                city = City.objects.filter(name=city_data['bairro']).first()

            if not city:
                # City not found let's search by name
                city = City.objects.filter(
                    name=city_data['localidade']).first()
        else:
            # Vamos utlizar a Cidade do Cookie Como Padrão o CEP não retornou uma CIdade Valida
            # PS: Isso pode dar merda mas vamos deixar o cliente arrumar a ciadade dele no final do formulario
            # city = $this->getCidadeByName(self::getCity());
            if getClientUserCookie():
                city = City.objects.get(getClientUserCookie()[
                                        'data']['city']['id'])

        if not city:
            raise exceptions.NotFound("Não temos cobertura na cidade relacionada aesse cep")

        serializer = self.get_serializer(city)
        data = serializer.data
        if city_data['bairro']:
            data['neighborhood'] = city_data['bairro']
        if city_data['logradouro']:
            data['street'] = city_data['logradouro']
        if city_data['uf']:
            data['state'] = city_data['uf']
        if city_data['cep']:
            data['postal_code'] = city_data['cep']

        return Response(data)


class CityRelationshipView(RelationshipView):
    queryset = City.objects
    filter_backends = (filters.SearchFilter,
                       filters.OrderingFilter, DjangoFilterBackend)


class PostalCodeRangeFilter(WebDjangoFilterSet):
    class Meta:
        model = PostalCodeRange
        fields = {
            'id': ['in', 'exact'],
            'start': ['contains', 'exact'],
            'end': ['contains', 'exact']
        }


class PostalCodeRangeViewSet(ModelViewSet):
    """
    Handles:
    Creating Postal Code Ranges
    Retrieve a list of Postal Code Ranges
    Retrieve a specific Postal Code Range
    Update Postal Code Ranges
    Deleting Postal Code Ranges
    """
    serializer_class = PostalCodeRangeSerializer
    queryset = PostalCodeRange.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter,
                       filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = PostalCodeRangeFilter
    search_fields = ('start', 'end',)
    permission_classes = ()


class PostalCodeRangeRelationshipView(RelationshipView):
    queryset = PostalCodeRange.objects


class StreetFilter(WebDjangoFilterSet):
    class Meta:
        model = Street
        fields = {
            'id': ['in', 'exact'],
            'name': ['contains', 'exact'],
            'short_name': ['contains', 'exact']
        }


class StreetViewSet(ModelViewSet):
    """
    Handles:
    Creating Streets
    Retrieve a list of Streets
    Retrieve a specific Street
    Update Streets
    Deleting Streets
    """
    serializer_class = StreetSerializer
    queryset = Street.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter,
                       filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = StreetFilter
    search_fields = ('name', 'short_name',)
    permission_classes = ()


class StreetRelationshipView(RelationshipView):
    queryset = Street.objects


class NumberRangeFilter(WebDjangoFilterSet):
    class Meta:
        model = NumberRange
        fields = {
            'id': ['in', 'exact'],
            'start': ['contains', 'exact'],
            'end': ['contains', 'exact']
        }


class NumberRangeViewSet(ModelViewSet):
    """
    Handles:
    Creating Number Ranges
    Retrieve a list of Number Ranges
    Retrieve a specific Number Range
    Update Number Ranges
    Deleting Number Ranges
    """
    serializer_class = NumberRangeSerializer
    queryset = NumberRange.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter,
                       filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = NumberRangeFilter
    search_fields = ('name', 'short_name',)
    permission_classes = ()


class NumberRangeRelationshipView(RelationshipView):
    queryset = NumberRange.objects
