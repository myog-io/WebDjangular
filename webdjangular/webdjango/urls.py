"""
WebDjangular URL Configuration
"""
import webdjangular.webdjango.signals.CoreSignals

from django.conf.urls import include
from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter
from webdjangular.webdjango.views.CoreViewSet import ThemeViewSet, AuthorViewSet, PluginViewSet, CoreConfigViewSet, WebsiteViewSet
from rest_framework.permissions import AllowAny
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="DjAngular API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="team@myog.io"),
      license=openapi.License(name="MIT License"),
   ),
   validators=['flex', 'ssv'],
   public=True,
   permission_classes=(AllowAny,),
)

router = DefaultRouter()
router.register(r'core_author', AuthorViewSet)
router.register(r'core_plugin', PluginViewSet)
router.register(r'core_theme', ThemeViewSet)
router.register(r'core_config', CoreConfigViewSet)
router.register(r'core_website', WebsiteViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api/swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^api/swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^api/docs/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    url(r'^api/', include(router.urls)),
    url(r'^api/', include('webdjangular.core.users.urls')),
    url(r'^api/', include('webdjangular.core.cms.urls')),
    url(r'^api/', include('webdjangular.core.init.urls')),
] + static(settings.MEDIA_URL, document_root=settings.STATIC_ROOT)
