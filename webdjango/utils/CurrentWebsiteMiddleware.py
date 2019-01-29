import requests
from django.utils.functional import SimpleLazyObject
from webdjango.models.Core import Website
from django.utils.deprecation import MiddlewareMixin

def get_website(request):
    if not hasattr(request, '_cached_website'):
        #TODO: Improve
        website = Website.objects.filter(domain__contains=request.get_host()).first()
        if website:
            request._cached_website = website
        else:
            request._cached_website = Website.getCurrentWebsite()

    return request._cached_website


class CurrentWebsiteMiddleware(MiddlewareMixin):
    def process_request(self, request):
        request.website = SimpleLazyObject(lambda: get_website(request))
