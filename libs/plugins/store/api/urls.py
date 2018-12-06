from django.conf.urls import include
from django.conf.urls import url
from rest_framework.routers import DefaultRouter

from libs.plugins.store.api.views.CartViewSet import CartViewSet
from libs.plugins.store.api.views.DiscountViewSet import VoucherViewSet, SaleViewSet
from libs.plugins.store.api.views.OrderViewSet import OrderViewSet
from libs.plugins.store.api.views.PaymentViewSet import PaymentViewSet
from libs.plugins.store.api.views.ProductViewSet import ProductViewSet, ProductCategoryViewSet
from libs.plugins.store.api.views.ShippingViewSet import ShippingMethodViewSet

router = DefaultRouter()
router.register('product', ProductViewSet, base_name='product')
router.register('category', ProductCategoryViewSet, base_name='category')
router.register('order', OrderViewSet, base_name='order')
router.register('payment', PaymentViewSet, base_name='payment')
router.register('voucher', VoucherViewSet, base_name='voucher')
router.register('sale', SaleViewSet, base_name='sale')
router.register('cart', CartViewSet, base_name='cart')
router.register('shipping-method', ShippingMethodViewSet, base_name='shipping-method')

urlpatterns = [
    url(r'store/', include(router.urls)),
]

router = DefaultRouter()
