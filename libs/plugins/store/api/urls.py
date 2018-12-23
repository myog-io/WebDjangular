from django.conf.urls import include
from django.conf.urls import url
from rest_framework.routers import DefaultRouter

from .views.CartViewSet import CartViewSet
from .views.DiscountViewSet import CartRuleViewSet, CatalogRuleViewSet
from .views.OrderViewSet import OrderViewSet
from .views.PaymentViewSet import PaymentViewSet
from .views.ProductViewSet import ProductViewSet, ProductCategoryViewSet, ProductRelationshipView, ProductTypeViewSet, ProductAttributeRelationshipView, ProductAttributeViewSet
from .views.ShippingViewSet import ShippingMethodViewSet

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


urlpatterns = [
    url(r'store/', include(router.urls)),
    url(
        regex=r'^store/product/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)$',
        view=ProductRelationshipView.as_view(),
        name='product-relationships'
    ),
    url(r'^store/product/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        ProductViewSet.as_view({'get': 'retrieve_related'}),
        name='product-related'),


    url(
        regex=r'^store/product-attribute/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)$',
        view=ProductAttributeRelationshipView.as_view(),
        name='product-attribute-relationships'
    ),
    url(r'^store/product-attribute/(?P<pk>[^/.]+)/(?P<related_field>\w+)/$',
        ProductAttributeViewSet.as_view({'get': 'retrieve_related'}),
        name='product-attribute-related'),



]

router = DefaultRouter()
