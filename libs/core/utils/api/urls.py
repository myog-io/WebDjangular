from django.conf.urls import include
from django.conf.urls import url
from rest_framework.routers import DefaultRouter

from libs.core.utils.api.views.AddressViewSet import AddressViewSet

router = DefaultRouter()
router.register('address', AddressViewSet, base_name='address')

urlpatterns = [
    url(r'', include(router.urls)),
]

router = DefaultRouter()
