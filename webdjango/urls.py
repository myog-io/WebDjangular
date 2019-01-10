"""
WebDjangular URL Configuration
"""
import webdjango.signals.CoreSignals
import webdjango.signals.EmailConfigRegisterSignals
from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.staticfiles.views import serve
from django.urls import path
from django.views.generic import RedirectView, TemplateView

from rest_framework.permissions import AllowAny
from rest_framework.routers import DefaultRouter
from webdjango.views.AddressViewSet import AddressViewSet
from webdjango.views.CoreConfigViewSet import CoreConfigGroupViewSet, \
    CoreConfigInputViewSet
from webdjango.views.CoreViewSet import AuthorViewSet, CoreConfigViewSet, \
    PluginViewSet, ThemeViewSet, WebsiteViewSet
from webdjango.views.InitViewSet import InitViewSet
import os
#settings.ANGULAR_CLIENT_APP_DIR, settings.ANGULAR_ADMIN_APP_DIR

'''
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
'''

router = DefaultRouter()
router.register(r'core_author', AuthorViewSet)
router.register(r'core_plugin', PluginViewSet)
router.register(r'core_theme', ThemeViewSet)
router.register(r'core_config', CoreConfigViewSet)
router.register(r'core_website', WebsiteViewSet)
router.register(r'core_init', InitViewSet)
router.register(r'core_config_input', CoreConfigInputViewSet,
                base_name='core_config_input')
router.register(r'core_config_group', CoreConfigGroupViewSet,
                base_name='core_config_group')
router.register(r'address', AddressViewSet, base_name='address')

urlpatterns = [
   
    url(r'^api/', include(router.urls)),

    url(r'^api/', include('libs.core.users.api.urls')),
    url(r'^api/', include('libs.core.cms.api.urls')),
    url(r'^api/', include('libs.core.media.api.urls')),
    url(r'^api/', include('libs.plugins.provider.api.urls')),
    url(r'^api/', include('libs.plugins.store.api.urls')),

    #url(r'^admin', TemplateView.as_view(template_name="/static/admin/index.html")),
    url(r'^admin', serve, kwargs={'path':  'admin/index.html'}),
   
    url(r'^$', serve, kwargs={'path':  'client/index.html'}),
    #url(r'^$', TemplateView.as_view(template_name='/client/index.html')),

]
urlpatterns = static('/admin/', document_root='static/admin/') + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static('/client_app/', document_root='static/client') + urlpatterns
