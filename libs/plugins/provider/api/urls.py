from django.conf.urls import url
from django.conf.urls import include
from rest_framework.routers import DefaultRouter

from libs.plugins.provider.api.views.CityViewSet import PostalCodeRangeViewSet, StreetViewSet, NumberRangeViewSet
from .views.CityViewSet import CityViewSet, CityRelationshipView
from .views.PageRedirectViewSet import PageRedirectViewSet, PageRedirectRelationshipView
from .views.ChannelViewSet import ChannelViewSet, ChannelRelationshipView
from .views.CondoViewSet import CondoViewSet, CondoRelationshipView
from .views.ResellerViewSet import ResellerViewSet, ResellerRelationshipView

router = DefaultRouter()
router.register('city', CityViewSet, base_name='city')
router.register('postal-code-range', PostalCodeRangeViewSet, base_name='postal-code-range')
router.register('street', StreetViewSet, base_name='street')
router.register('number-range', NumberRangeViewSet, base_name='number-range')



router.register('page-redirect', PageRedirectViewSet,
                base_name='page-redirect')
router.register('channel', ChannelViewSet, base_name='channel')
router.register('condo', CondoViewSet, base_name='condo')
router.register('reseller', ResellerViewSet, base_name='reseller')

urlpatterns = [
    url(r'provider/', include(router.urls)),
    # Page Redirect Relations
    url(
        regex=r'^provider/page-redirect/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)$',
        view=PageRedirectRelationshipView.as_view(),
        name='page-redirect-relationships'
    ),
    url(r'^provider/product/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        PageRedirectViewSet.as_view({'get': 'retrieve_related'}),
        name='page-redirect-related'),
    # Channel Relations
    url(
        regex=r'^provider/city/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)$',
        view=ChannelRelationshipView.as_view(),
        name='city-relationships'
    ),
    url(r'^provider/product/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        CityViewSet.as_view({'get': 'retrieve_related'}),
        name='city-related'),
    # City Relations
    url(
        regex=r'^provider/channel/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)$',
        view=CityRelationshipView.as_view(),
        name='channel-relationships'
    ),
    url(r'^provider/product/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        ChannelViewSet.as_view({'get': 'retrieve_related'}),
        name='channel-related'),
    # Condo Relations
    url(
        regex=r'^provider/condo/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)$',
        view=CondoRelationshipView.as_view(),
        name='condo-relationships'
    ),
    url(r'^provider/product/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        CondoViewSet.as_view({'get': 'retrieve_related'}),
        name='condo-related'),
    # Resseler Relations
    url(
        regex=r'^provider/reseller/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)$',
        view=ResellerRelationshipView.as_view(),
        name='reseller-relationships'
    ),
    url(r'^provider/product/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        ResellerViewSet.as_view({'get': 'retrieve_related'}),
        name='reseller-related'),
]
