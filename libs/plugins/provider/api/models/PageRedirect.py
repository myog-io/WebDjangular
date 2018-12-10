from djongo import models
from django import forms
from webdjango.models.AbstractModels import DateTimeModel
from libs.core.cms.api.models.Page import Page
from .City import City


class PageRedirect(DateTimeModel):
    default_page = models.ForeignKey(
        Page, on_delete=models.CASCADE, related_name='provider_default')
    redirect_page = models.ForeignKey(
        Page, on_delete=models.CASCADE, related_name='provider_redirect')
    cities = models.ArrayReferenceField(
        City, related_name='redirect', blank=True, null=True)

    class Meta:
        db_table = 'provider_redirect'
        ordering = ['-id']
