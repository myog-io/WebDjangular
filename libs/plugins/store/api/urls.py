from django.conf.urls import include
from django.conf.urls import url
from rest_framework.routers import DefaultRouter

from .views.CartViewSet import CartViewSet
from .views.DiscountViewSet import VoucherViewSet, SaleViewSet
from .views.OrderViewSet import OrderViewSet
from .views.PaymentViewSet import PaymentViewSet
from .views.ProductViewSet import ProductViewSet, ProductCategoryViewSet, ProductRelationshipView, ProductTypeViewSet
from .views.ShippingViewSet import ShippingMethodViewSet

router = DefaultRouter()
router.register('product', ProductViewSet, base_name='product')
router.register('category', ProductCategoryViewSet, base_name='category')
router.register('order', OrderViewSet, base_name='order')
router.register('payment', PaymentViewSet, base_name='payment')
router.register('voucher', VoucherViewSet, base_name='voucher')
router.register('sale', SaleViewSet, base_name='sale')
router.register('cart', CartViewSet, base_name='cart')
router.register('shipping-method', ShippingMethodViewSet, base_name='shipping-method')
router.register('product-type',  ProductTypeViewSet, base_name='product-type')

urlpatterns = [
    url(r'store/', include(router.urls)),
    url(
        regex=r'^store/product/(?P<pk>[^/.]+)/relationships/(?P<related_field>[^/.]+)$',
        view=ProductRelationshipView.as_view(),
        name='product-relationships'
    )
]

router = DefaultRouter()
