from django.conf.urls import url
from django.conf.urls import include
from rest_framework.routers import DefaultRouter

from libs.plugins.provider.api.views.CityViewSet import CityViewSet

router = DefaultRouter()
router.register('city', CityViewSet, base_name='city')


urlpatterns = [
    url(r'', include(router.urls)),
]

