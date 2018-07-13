from django.conf.urls import url
from django.conf.urls import include
from rest_framework.routers import DefaultRouter

from .views.PageViewSet import PageViewSet

router = DefaultRouter()
router.register('page', PageViewSet, base_name='page')


urlpatterns = [
    url(r'', include(router.urls)),
]

