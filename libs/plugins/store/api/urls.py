from django.conf.urls import include
from django.conf.urls import url
from rest_framework.routers import DefaultRouter

from .views.CartViewSet import CartViewSet
from .views.DiscountViewSet import VoucherViewSet, SaleViewSet
from .views.OrderViewSet import OrderViewSet
from .views.PaymentViewSet import PaymentViewSet
from .views.ProductViewSet import ProductViewSet, ProductCategoryViewSet, ProductRelationshipView, ProductTypeViewSet, \
    ProductAddonViewSet
from .views.ShippingViewSet import ShippingMethodViewSet

router = DefaultRouter()
router.register('cart', CartViewSet, base_name='cart')
router.register('category', ProductCategoryViewSet, base_name='category')
router.register('payment', PaymentViewSet, base_name='payment')
router.register('order', OrderViewSet, base_name='order')
router.register('product', ProductViewSet, base_name='product')
router.register('product-type', ProductTypeViewSet, base_name='product-type')
router.register('product-addon', ProductAddonViewSet, base_name='product-addon')
router.register('sale', SaleViewSet, base_name='sale')
router.register('shipping-method', ShippingMethodViewSet, base_name='shipping-method')
router.register('voucher', VoucherViewSet, base_name='voucher')

urlpatterns = [
    url(r'store/', include(router.urls)),
    url(
        regex=r'^store/product/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)$',
        view=ProductRelationshipView.as_view(),
        name='product-relationships'
    )
]

router = DefaultRouter()
