from django_filters.rest_framework.filterset import FilterSet
from .signals.WebDjangoSignals import pre_init_filter, post_init_filter


class WebDjangoFilterSet(FilterSet):

    def __init__(self, *args, **kwargs):
        pre_init_filter.send(
            sender=self.__class__, filterset=self, args=args, kwargs=kwargs)
        super(WebDjangoFilterSet, self).__init__(*args, **kwargs)
        post_init_filter.send(
            sender=self.__class__, filterset=self, args=args, kwargs=kwargs)
