from django.conf.urls import url
from django.conf.urls import include
from rest_framework.routers import DefaultRouter

# from libs.plugins.store.api.views

router = DefaultRouter()


urlpatterns = [
    url(r'', include(router.urls)),
]

