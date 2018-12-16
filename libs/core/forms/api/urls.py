from django.conf.urls import url
from django.conf.urls import include
from rest_framework.routers import DefaultRouter

from libs.core.forms.api.views.FormViewSet import FormViewSet

router = DefaultRouter()
router.register('form', FormViewSet, base_name='form')

urlpatterns = [
    url(r'', include(router.urls)),
]
