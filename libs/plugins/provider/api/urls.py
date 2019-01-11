from django.conf.urls import include
from django.conf.urls import url
from rest_framework.routers import DefaultRouter

from libs.plugins.provider.api.views.CityViewSet import PostalCodeRangeViewSet, StreetViewSet, NumberRangeViewSet, \
    CityRelationshipView, PostalCodeRangeRelationshipView, StreetRelationshipView, NumberRangeRelationshipView
from libs.plugins.provider.api.views.CondoViewSet import CondoRelationshipView
from libs.plugins.provider.api.views.ResellerViewSet import ResellerRelationshipView
from .views.ChannelViewSet import ChannelViewSet, ChannelRelationshipView
from .views.CityViewSet import CityViewSet
from .views.CondoViewSet import CondoViewSet
from .views.PageRedirectViewSet import PageRedirectViewSet, PageRedirectRelationshipView
from .views.ResellerViewSet import ResellerViewSet

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

relationshipPatterns = [
    # Page Redirect relationships
    url(regex=r'^page-redirect/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)/$',
        view=PageRedirectRelationshipView.as_view(),
        name='page-redirect-relationships'),
    url(regex=r'^pageredirect/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        view=PageRedirectViewSet.as_view({'get': 'retrieve_related'}),
        name='page-redirect-related'),

    # City relationships
    url(regex=r'^city/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)/$',
        view=CityRelationshipView.as_view(),
        name='city-relationships'),
    url(regex=r'^city/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        view=CityViewSet.as_view({'get': 'retrieve_related'}),
        name='city-related'),

    # Postal Code Range relationships
    url(regex=r'^postal-code-range/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)/$',
        view=PostalCodeRangeRelationshipView.as_view(),
        name='postal-code-range-relationships'),
    url(regex=r'^postal-code-range/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        view=PostalCodeRangeViewSet.as_view({'get': 'retrieve_related'}),
        name='postal-code-range-related'),

    # Street relationships
    url(regex=r'^street/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)/$',
        view=StreetRelationshipView.as_view(),
        name='street-relationships'),
    url(regex=r'^street/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        view=StreetViewSet.as_view({'get': 'retrieve_related'}),
        name='street-related'),

    # Number Range relationships
    url(regex=r'^number-range/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)/$',
        view=NumberRangeRelationshipView.as_view(),
        name='number-range-relationships'),
    url(regex=r'^number-range/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        view=NumberRangeViewSet.as_view({'get': 'retrieve_related'}),
        name='number-range-related'),

    # Channel relationships
    url(regex=r'^channel/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)/$',
        view=ChannelRelationshipView.as_view(),
        name='channel-relationships'),
    url(regex=r'^channel/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        view=ChannelViewSet.as_view({'get': 'retrieve_related'}),
        name='channel-related'),

    # Condo relationships
    url(regex=r'^condo/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)/$',
        view=CondoRelationshipView.as_view(),
        name='condo-relationships'),
    url(regex=r'^condo/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        view=CondoViewSet.as_view({'get': 'retrieve_related'}),
        name='condo-related'),

    # Reseller relationships
    url(regex=r'^reseller/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)/$',
        view=ResellerRelationshipView.as_view(),
        name='reseller-relationships'),
    url(regex=r'^reseller/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        view=ResellerViewSet.as_view({'get': 'retrieve_related'}),
        name='reseller-related'),
]
urlpatterns = [
    url(r'provider/', include(router.urls)),
    url(r'provider/', include(relationshipPatterns)),

]
