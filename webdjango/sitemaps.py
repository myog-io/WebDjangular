from django.contrib.sitemaps import Sitemap

from libs.core.cms.api.models.Page import Page, PageClasses

class PageSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.8

    def items(self):
        # TODO: return Page.objects.filter(is_draft=False)
        return Page.objects.filter(page_class=PageClasses.STATIC)

    def lastmod(self, obj):
        return obj.updated


class PostSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.8

    def items(self):
        # TODO: return Page.objects.filter(is_draft=False)
        return Page.objects.filter(page_class=PageClasses.POST)

    def lastmod(self, obj):
        return obj.updated
