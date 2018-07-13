"""
WebDjangular URL Configuration
"""

from django.conf.urls import include
from django.conf.urls import url
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api/', include('webdjangular.apps.users.urls')),
    url(r'^api/', include('webdjangular.apps.cms.urls')),
]
