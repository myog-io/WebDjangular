from .views.CartViewSet import CartViewSet
from .views.DiscountViewSet import CartRuleViewSet, CatalogRuleViewSet
from .views.OrderViewSet import OrderViewSet
from .views.PaymentViewSet import PaymentViewSet
from .views.ProductViewSet import ProductAttributeRelationshipView, \
    ProductAttributeViewSet, ProductCategoryViewSet, ProductRelationshipView, \
    ProductTypeRelationshipView, ProductTypeViewSet, ProductViewSet
from .views.ShippingViewSet import ShippingMethodViewSet
from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('cart', CartViewSet, base_name='cart')
router.register('category', ProductCategoryViewSet, base_name='category')
router.register('discount/catalog-rule', CatalogRuleViewSet,
                base_name='discount/catalog-rule')
router.register('discount/cart-rule', CartRuleViewSet,
                base_name='discount/cart-rule')
router.register('payment', PaymentViewSet, base_name='payment')
router.register('order', OrderViewSet, base_name='order')
router.register('product', ProductViewSet, base_name='product')
router.register('product-type', ProductTypeViewSet, base_name='product-type')
router.register('product-attribute', ProductAttributeViewSet,
                base_name='product-attribute')

router.register('shipping-method', ShippingMethodViewSet,
                base_name='shipping-method')


relationshipPatterns = [
    url(
        regex=r'^product/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)/$',
        view=ProductRelationshipView.as_view(),
        name='product-relationships'
    ),
    url(r'^product/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        ProductViewSet.as_view({'get': 'retrieve_related'}),
        name='product-related'
    ),
    # Product Type
    url(
        regex=r'^product-type/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)/$',
        view=ProductTypeRelationshipView.as_view(),
        name='product-type-relationships'
    ),
    url(r'^product-type/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        ProductTypeViewSet.as_view({'get': 'retrieve_related'}),
        name='product-type-related'
    ),
    # Product Type Attributes (data)
    url(
        regex=r'^product-attribute/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)/$',
        view=ProductAttributeRelationshipView.as_view(),
        name='product-attribute-relationships'
    ),
    url(r'^product-attribute/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        ProductAttributeViewSet.as_view({'get': 'retrieve_related'}),
        name='product-attribute-related'
    ),
]

urlpatterns = [
    url(r'store/', include(router.urls)),
    url(r'store/', include(relationshipPatterns)),
]

router=DefaultRouter()
