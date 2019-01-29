from .City import City
from django import forms
from django.db import models
from libs.core.cms.api.models.Page import Page
from webdjango.models.AbstractModels import BaseModel


class PageRedirect(BaseModel):
    default_page = models.ForeignKey(
        Page, on_delete=models.CASCADE, related_name='provider_default')
    redirect_page = models.ForeignKey(
        Page, on_delete=models.CASCADE, related_name='provider_redirect')
    cities = models.ManyToManyField(City)

    class Meta:
        db_table = 'provider_redirect'
        ordering = ['-created']
