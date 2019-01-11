from django.conf.urls import url
from django.conf.urls import include
from rest_framework.routers import DefaultRouter

from .views.MediaViewSet import MediaViewSet

router = DefaultRouter()
router.register('media', MediaViewSet)


urlpatterns = [
    url(r'', include(router.urls)),
]
