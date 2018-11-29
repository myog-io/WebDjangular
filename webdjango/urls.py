"""
WebDjangular URL Configuration
"""
import webdjango.signals.CoreSignals
import webdjango.signals.EmailConfigRegisterSignals

from django.conf.urls import include
from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter
from webdjango.views.CoreViewSet import ThemeViewSet, AuthorViewSet, PluginViewSet, CoreConfigViewSet, WebsiteViewSet
from webdjango.views.CoreConfigViewSet import CoreConfigGroupViewSet, CoreConfigInputViewSet
from webdjango.views.InitViewSet import InitViewSet
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
router.register(r'core_init', InitViewSet)
router.register(r'core_config_input', CoreConfigInputViewSet, base_name='core_config_input')
router.register(r'core_config_group', CoreConfigGroupViewSet, base_name='core_config_group')


urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api/swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^api/swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^api/docs/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    url(r'^api/', include(router.urls)),

    url(r'^api/', include('libs.core.users.api.urls')),
    url(r'^api/', include('libs.core.cms.api.urls')),
    url(r'^api/', include('libs.core.media.api.urls')),

    url(r'^api/', include('libs.core.forms.api.urls')),
    # TODO: Add dynamic routes based on active plugins
    url(r'^api/', include('libs.plugins.provider.api.urls')),
    #url(r'^api/core_config_input/$',CoreConfigInputViewSet.as_view(), name='core_config_input'),
    #url(r'^api/core_config_group/$',CoreConfigGroupViewSet.as_view(), name='core_config_group')


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
