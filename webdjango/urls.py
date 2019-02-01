"""
WebDjangular URL Configuration
"""
from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib.sitemaps import views as sitemaps_views
# settings.ANGULAR_CLIENT_APP_DIR, settings.ANGULAR_ADMIN_APP_DIR
from django.contrib.staticfiles.views import serve
from django.urls import path
from rest_framework.routers import DefaultRouter

from .sitemaps import PageSitemap, PostSitemap, index as sitemap_index, sitemap as sitemap_section
from .views.AddressViewSet import AddressViewSet
from .views.CoreConfigViewSet import CoreConfigGroupViewSet, \
    CoreConfigInputViewSet
from .views.CoreViewSet import AuthorViewSet, CoreConfigViewSet, \
    PluginViewSet, ThemeViewSet, WebsiteViewSet
from .views.EmailViewSet import EmailViewSet
from .views.InitViewSet import InitViewSet
from django.views.decorators.cache import cache_page

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
router.register(r'core_email', EmailViewSet)
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

sitemaps = {
    'page': PageSitemap(),
    'post': PostSitemap()
}

urlpatterns = [

    url(r'^api/', include(router.urls)),

    url(r'^api/', include('libs.core.users.api.urls')),
    url(r'^api/', include('libs.core.cms.api.urls'), name='cms'),
    url(r'^api/', include('libs.core.media.api.urls')),
    url(r'^api/', include('libs.plugins.provider.api.urls')),
    url(r'^api/', include('libs.plugins.store.api.urls')),

    # url(r'^sitemap\.xml$', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
    path('sitemap.xml',
         sitemap_index,
         {'sitemaps': sitemaps, 'sitemap_url_name': 'sitemaps'}),
    path('sitemap-<section>.xml',
         sitemap_section,
         {'sitemaps': sitemaps}, name='sitemaps'),

    # url(r'^admin', TemplateView.as_view(template_name="/static/admin/index.html")),
    url(r'^admin', serve, kwargs={'path': 'admin/index.html'}),
    url(r'^', serve, kwargs={'path': 'client/index.html'}),
]
urlpatterns = static('/admin/', document_root='static/admin/') + static(settings.MEDIA_URL,
                                                                        document_root=settings.MEDIA_ROOT) + static(
    '/client_app/', document_root='static/client') + urlpatterns
