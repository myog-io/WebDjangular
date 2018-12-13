from django.conf.urls import url
from django.conf.urls import include
from rest_framework.routers import DefaultRouter

from .views.CityViewSet import CityViewSet
from .views.PageRedirectViewSet import PageRedirectViewSet, PageRedirectRelationshipView
from .views.ChannelViewSet import ChannelViewSet, ChannelRelationshipView
from .views.CondoViewSet import CondoViewSet, CondoRelationshipView
from .views.ResellerViewSet import ResellerViewSet, ResellerRelationshipView

router = DefaultRouter()
router.register('city', CityViewSet, base_name='city')
router.register('page-redirect', PageRedirectViewSet, base_name='page-redirect')
router.register('channel', ChannelViewSet, base_name='channel')
router.register('condo', CondoViewSet, base_name='condo')
router.register('reseller', ResellerViewSet, base_name='reseller')

urlpatterns = [
    url(r'provider/', include(router.urls)),
    url(
        regex=r'^provider/page-redirect/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)$',
        view=PageRedirectRelationshipView.as_view(),
        name='page-redirect-relationships'
    ),
    url(
        regex=r'^provider/channel/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)$',
        view=ChannelRelationshipView.as_view(),
        name='page-redirect-relationships'
    ),
    url(
        regex=r'^provider/condo/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)$',
        view=CondoRelationshipView.as_view(),
        name='page-redirect-relationships'
    ),
    url(
        regex=r'^provider/reseller/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)$',
        view=ResellerRelationshipView.as_view(),
        name='page-redirect-relationships'
    )
]

