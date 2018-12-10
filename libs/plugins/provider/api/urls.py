from django.conf.urls import url
from django.conf.urls import include
from rest_framework.routers import DefaultRouter

from .views.CityViewSet import CityViewSet
from .views.PageRedirectViewSet import PageRedirectViewSet, PageRedirectRelationshipView

router = DefaultRouter()
router.register('city', CityViewSet, base_name='city')
router.register('page-redirect', PageRedirectViewSet, base_name='page-redirect')


urlpatterns = [
    url(r'provider/', include(router.urls)),
    url(
        regex=r'^provider/page-redirect/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)$',
        view=PageRedirectRelationshipView.as_view(),
        name='page-redirect-relationships'
    )
]

