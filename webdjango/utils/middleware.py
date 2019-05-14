import requests
from django.utils.functional import SimpleLazyObject
from webdjango.models.Core import Website
from django.utils.deprecation import MiddlewareMixin
from django.utils.cache import add_never_cache_headers

def get_website(request):
    if not hasattr(request, '_cached_website'):
        #TODO: Improve
        website = Website.objects.filter(domain__contains=request.get_host()).first()
        if website:
            request._cached_website = website
        else:
            request._cached_website = Website.get_current_website()

    return request._cached_website


class CurrentWebsiteMiddleware(MiddlewareMixin):
    def process_request(self, request):
        request.website = SimpleLazyObject(lambda: get_website(request))
        

class DisableClientSideCachingMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        if request.user.is_authenticated:
            add_never_cache_headers(response)
        return response