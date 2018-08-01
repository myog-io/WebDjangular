from django.conf.urls import url
from django.conf.urls import include
from rest_framework.routers import DefaultRouter

from webdjangular.apps.blog.views.PostViewSet import PostViewSet

router = DefaultRouter()
router.register('post', PostViewSet)

urlpatterns = [
    url(r'blog/', include(router.urls)),
]


