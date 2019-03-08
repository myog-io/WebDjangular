from django.conf.urls import include
from django.conf.urls import url
from rest_framework.routers import DefaultRouter

from libs.core.cms.api.views.BlockViewSet import BlockViewSet, BlockRelationshipView
from libs.core.cms.api.views.MenuItemViewSet import MenuItemViewSet, MenuItemRelationshipView
from libs.core.cms.api.views.MenuViewSet import MenuViewSet, MenuRelationshipView
from libs.core.cms.api.views.PageViewSet import PageViewSet, PageRelationshipView, PageTagViewSet, PageCategoryViewSet
from libs.core.cms.api.views.FormViewSet import FormViewSet, FormSubmitionViewSet, FormRelationshipView, FormSubmitionRelationshipView, \
    FormActionViewSet, FormActionRelationshipView, FormFieldViewSet, FormFieldRelationshipView

router = DefaultRouter()
router.register('block', BlockViewSet, base_name='block')
router.register('menu', MenuViewSet, base_name='menu')
router.register('menu_item', MenuItemViewSet, base_name='menuitem')
router.register('page', PageViewSet, base_name='page')
router.register('page-tag', PageTagViewSet, base_name='page-tag')
router.register('page-category', PageCategoryViewSet,
                base_name='page-category')
router.register('form', FormViewSet, base_name='form')
router.register('form-submition', FormSubmitionViewSet,
                base_name='form-submition')
router.register('form-action', FormActionViewSet, base_name='form-action')
router.register('form-field', FormFieldViewSet, base_name='form-field')

relationshipPatterns = [
    # Blocks relationships
    url(
        regex=r'^block/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)/$',
        view=BlockRelationshipView.as_view(),
        name='block-relationships'
    ),
    url(r'^block/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        BlockViewSet.as_view({'get': 'retrieve_related'}),
        name='block-related'
        ),

    # Menu relationships
    url(
        regex=r'^menu/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)/$',
        view=MenuRelationshipView.as_view(),
        name='menu-relationships'
    ),
    url(r'^menu/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        MenuViewSet.as_view({'get': 'retrieve_related'}),
        name='menu-related'
        ),


    # MenuItem relationships
    url(
        regex=r'^menu_item/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)/$',
        view=MenuItemRelationshipView.as_view(),
        name='menu_item-relationships'
    ),
    url(r'^menu_item/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        MenuItemViewSet.as_view({'get': 'retrieve_related'}),
        name='menu_item-related'
        ),


    # pages relationships
    url(
        regex=r'^page/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)/$',
        view=PageRelationshipView.as_view(),
        name='page-relationships'
    ),
    url(r'^page/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        PageViewSet.as_view({'get': 'retrieve_related'}),
        name='page-related'
        ),

    # forms relationships
    url(
        regex=r'^form/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)/$',
        view=FormRelationshipView.as_view(),
        name='form-relationships'
    ),
    url(r'^form/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        FormViewSet.as_view({'get': 'retrieve_related'}),
        name='form-related'
        ),

    # forms submition relationships
    url(
        regex=r'^form-action/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)/$',
        view=FormActionRelationshipView.as_view(),
        name='form-action-relationships'
    ),
    url(r'^form-submition/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        FormActionViewSet.as_view({'get': 'retrieve_related'}),
        name='form-action-related'
        ),

    # forms submition relationships
    url(
        regex=r'^form-field/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)/$',
        view=FormFieldRelationshipView.as_view(),
        name='form-field-relationships'
    ),
    url(r'^form-field/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        FormFieldViewSet.as_view({'get': 'retrieve_related'}),
        name='form-field-related'
        ),

    # forms submition relationships
    url(
        regex=r'^form-submition/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)/$',
        view=FormSubmitionRelationshipView.as_view(),
        name='form-submition-relationships'
    ),
    url(r'^form-submition/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        FormSubmitionViewSet.as_view({'get': 'retrieve_related'}),
        name='form-submition-related'
        ),
]
urlpatterns = [
    url(r'cms/', include(router.urls)),
    url(r'cms/', include(relationshipPatterns)),

]
