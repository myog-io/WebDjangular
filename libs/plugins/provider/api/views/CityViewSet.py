import json

import requests
from django_filters.filters import ModelChoiceFilter
from rest_framework import exceptions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_json_api.views import ModelViewSet, RelationshipView

from libs.plugins.store.api.models.Product import Product
from webdjango.filters import WebDjangoFilterSet

from ..models.City import City, NumberRange, PostalCodeRange, Street
from ..serializers.CitySerializer import (CitySerializer,
                                          NumberRangeSerializer,
                                          PostalCodeRangeSerializer,
                                          StreetSerializer)
from ..utils import getClientUserCookie
from webdjango.views.CoreViewSet import CachedModelViewSet

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


class CityViewSet(CachedModelViewSet):
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
    ordering_fields = '__all__'
    filter_class = CityFilter
    search_fields = ('name',)
    public_views = ('retrieve', 'list', 'postal_code')

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
            if city_data['bairro'] and city_data['bairro'].lower().find('distrito') is not -1:
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
            raise exceptions.NotFound(
                "Desculpe, infelizmente não temos cobertura na cidade {1} CEP:{0}".format(
                    city_data['cep'], city_data['localidade'])
            )

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
    ordering_fields = '__all__'
    filter_class = PostalCodeRangeFilter
    search_fields = ('start', 'end',)


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
    ordering_fields = '__all__'
    filter_class = StreetFilter
    search_fields = ('name', 'short_name',)


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
    ordering_fields = '__all__'
    filter_class = NumberRangeFilter
    search_fields = ('name', 'short_name',)


class NumberRangeRelationshipView(RelationshipView):
    queryset = NumberRange.objects
