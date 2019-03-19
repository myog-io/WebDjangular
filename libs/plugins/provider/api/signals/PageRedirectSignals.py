from django.dispatch import receiver

from libs.core.cms.api.signals import pre_get_page

from ..models.PageRedirect import PageRedirect
from ..utils import getClientUserCookie


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
                    page_redirect = PageRedirect.objects.filter(
                        **filter_args).first()
                    if page_redirect:
                        kwargs['slug'] = page_redirect.redirect_page.slug
                        kwargs['pk'] = page_redirect.redirect_page.pk
    return kwargs
