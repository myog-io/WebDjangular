from ..models.City import City
from ..models.PageRedirect import PageRedirect
from .CitySerializer import CitySerializer
from libs.core.cms.api.models.Page import Page
from libs.core.cms.api.serializers.PageSerializer import PageSerializer
from rest_framework_json_api import serializers
from rest_framework_json_api.relations import ResourceRelatedField
from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer

class PageRedirectSerializer(WebDjangoSerializer):
    #default_page  = PageSerializer(many=False)
    #redirect_page = PageSerializer(many=False)

    default_page = ResourceRelatedField(
        many=False,
        queryset=Page.objects,

        related_link_url_kwarg='pk',
        self_link_view_name='page-redirect-relationships'
    )
    redirect_page = ResourceRelatedField(
        many=False,
        queryset=Page.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='page-redirect-relationships'
    )
    cities = ResourceRelatedField(
        many=True,
        queryset=City.objects,
        related_link_url_kwarg='pk',
        self_link_view_name='page-redirect-relationships'
    )
    included_serializers = {
        'default_page': 'libs.core.cms.api.serializers.PageSerializer.PageSerializer',
        'redirect_page': 'libs.core.cms.api.serializers.PageSerializer.PageSerializer',
        'cities' : 'libs.plugins.provider.api.serializers.CitySerializer.CitySerializer',
    }


    class Meta:
        model = PageRedirect
        fields = '__all__'
