"""
WebDjangular URL Configuration
"""

from django.conf.urls import include
from django.conf.urls import url
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^', include('apps.users.urls')),
]

