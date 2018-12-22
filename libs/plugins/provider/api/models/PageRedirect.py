from .City import City
from django import forms
from django.db import models
from libs.core.cms.api.models.Page import Page
from webdjango.models.AbstractModels import BaseModel


class PageRedirect(BaseModel):
    default_page = models.OneToOneField(
        Page, on_delete=models.CASCADE, related_name='provider_default')
    redirect_page = models.OneToOneField(
        Page, on_delete=models.CASCADE, related_name='provider_redirect')
    cities = models.ForeignKey(
        City, related_name='redirect', on_delete=models.CASCADE,blank=True, null=True)

    class Meta:
        db_table = 'provider_redirect'
        ordering = ['-created']
