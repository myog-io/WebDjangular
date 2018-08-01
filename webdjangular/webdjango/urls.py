"""
WebDjangular URL Configuration
"""

from django.conf.urls import include
from django.conf.urls import url
from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter
from webdjangular.webdjango.views.CoreViewSet import ThemeViewSet, AuthorViewSet, AppViewSet

router = DefaultRouter()
router.register(r'core_author', AuthorViewSet)
router.register(r'core_app', AppViewSet)
router.register(r'core_theme', ThemeViewSet)



urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^', include(router.urls)),
    url(r'^', include('webdjangular.apps.users.urls')),
    url(r'^api/', include('webdjangular.apps.cms.urls')),
    url(r'^api/', include('webdjangular.apps.blog.urls')),
]
