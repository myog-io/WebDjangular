
from django.dispatch import receiver, Signal
from libs.core.cms.api.models.Page import Page
from libs.core.cms.api.signals import pre_get_page, post_get_page
from ..models.PageRedirect import PageRedirect
from ..utils import getClientUserCookie
import json
import urllib
@receiver(pre_get_page)
def redirect(sender, request, *args, **kwargs):
    if getClientUserCookie(request):
        client = getClientUserCookie(request)
        if 'data' in client:
            data = client['data']

            if 'city' in data:
                city = data['city']
                if 'id' in city:
                    filter_args = {}
                    if 'slug' in kwargs:
                        filter_args['default_page__slug'] = kwargs['slug']
                    else:
                        filter_args['default_page__pk'] = kwargs['pk']

                    filter_args['cities__pk'] = city['id']
                    print(filter_args)
                    pageRedirect = PageRedirect.objects.filter(**filter_args).first()
                    if pageRedirect:
                        kwargs['slug'] = pageRedirect.redirect_page.slug
                        kwargs['pk'] = pageRedirect.redirect_page.pk
    return kwargs
