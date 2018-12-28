from django.conf.urls import url
from django.conf.urls import include
from rest_framework.routers import DefaultRouter

from libs.core.cms.api.views.PageViewSet import PageViewSet, PageRelationshipView
from libs.core.cms.api.views.BlockViewSet import BlockViewSet, BlockRelationshipView
from libs.core.cms.api.views.MenuViewSet import MenuViewSet

router = DefaultRouter()
router.register('page', PageViewSet, base_name='page')
router.register('block', BlockViewSet, base_name='block')
router.register('menu', MenuViewSet, base_name='menu')


urlpatterns = [
    url(r'', include(router.urls)),
    url(
        regex=r'^page/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)/$',
        view=PageRelationshipView.as_view(),
        name='page-relationships'
    ),
    url(r'^page/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        PageViewSet.as_view({'get': 'retrieve_related'}),
        name='page-related'
    ),
    url(
        regex=r'^block/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)/$',
        view=BlockRelationshipView.as_view(),
        name='block-relationships'
    ),
    url(r'^page/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        BlockViewSet.as_view({'get': 'retrieve_related'}),
        name='block-related'),

]

