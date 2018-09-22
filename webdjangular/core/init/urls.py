from django.conf.urls import url
from django.conf.urls import include
from rest_framework.routers import DefaultRouter

from rest_framework_jwt.views import refresh_jwt_token
from webdjangular.core.init.views.InitAPIView import InitAPIView



urlpatterns = [
    url(r'^init', InitAPIView.as_view()),
]
