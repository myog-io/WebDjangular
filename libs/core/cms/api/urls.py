from django.conf.urls import url
from django.conf.urls import include
from rest_framework.routers import DefaultRouter

from libs.core.cms.api.views.PageViewSet import PageViewSet, PageRelationshipView
from libs.core.cms.api.views.BlockViewSet import BlockViewSet, BlockRelationshipView
from libs.core.cms.api.views.MenuViewSet import MenuViewSet, MenuRelationshipView
from libs.core.cms.api.views.MenuItemViewSet import MenuItemViewSet, MenuItemRelationshipView

router = DefaultRouter()
router.register('page', PageViewSet, base_name='page')
router.register('block', BlockViewSet, base_name='block')
router.register('menu', MenuViewSet, base_name='menu')
router.register('menu_item', MenuItemViewSet, base_name='menuitem')


urlpatterns = [
    url(r'', include(router.urls)),
    #pages relationships
    url(
        regex=r'^page/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)/$',
        view=PageRelationshipView.as_view(),
        name='page-relationships'
    ),
    url(r'^page/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        PageViewSet.as_view({'get': 'retrieve_related'}),
        name='page-related'
    ),
    #Blocks relationships
    url(
        regex=r'^block/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)/$',
        view=BlockRelationshipView.as_view(),
        name='block-relationships'
    ),
    url(r'^page/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        BlockViewSet.as_view({'get': 'retrieve_related'}),
        name='block-related'
    ),
    #Menu relationships
    url(
        regex=r'^menu/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)/$',
        view=MenuRelationshipView.as_view(),
        name='menu-relationships'
    ),
    url(r'^menu/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        MenuViewSet.as_view({'get': 'retrieve_related'}),
        name='menu-related'
    ),
    #MenuItem relationships
    url(
        regex=r'^menu_item/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)/$',
        view=MenuItemRelationshipView.as_view(),
        name='menu_item-relationships'
    ),
    url(r'^menu_item/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        MenuItemViewSet.as_view({'get': 'retrieve_related'}),
        name='menu_item-related'
    ),

]

