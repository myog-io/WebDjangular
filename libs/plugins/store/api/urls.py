from django.conf.urls import url
from django.conf.urls import include
from rest_framework.routers import DefaultRouter

from libs.plugins.store.api.views.ProductViewSet import ProductViewSet


router = DefaultRouter()
router.register('product', ProductViewSet, base_name='product')

urlpatterns = [
    url(r'store/', include(router.urls)),
]



router = DefaultRouter()
