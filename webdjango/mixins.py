from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_json_api.utils import get_included_resources, \
    get_included_serializers, get_resource_type_from_model

import operator
from functools import reduce


class MultipleFieldLookupMixin(object):
    def get_object(self):
        queryset = self.get_queryset()             # Get the base queryset
        queryset = self.filter_queryset(queryset)  # Apply any filter backends
        filter = {}
        for field in self.lookup_fields:
            filter[field] = self.kwargs[field]
        q = reduce(operator.or_, (Q(x) for x in filter.items()))
        return get_object_or_404 (queryset, q)


class RelatedFieldModelMixin(object):
    """
    Mixin for Related Field, this way we can get the childrens of a Model if necessary
    """
    #@action(detail=True, methods=['get'], url_path=r"(?P<related_field>\w+)", url_name="related_field" )
    def related_field(self, request, pk=None, related_field=None, *args, **kwargs):
        serializers = get_included_serializers(self.serializer_class)

        if serializers[related_field]:
            entry = get_object_or_404(self.get_queryset(), pk=pk)
            queryset = getattr(entry,related_field).all()
            self.resource_name = get_resource_type_from_model(serializers[related_field].Meta.model)
            #(get_resource_type_from_instance(queryset))

            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = serializers[related_field](page, many=True)
                #serializer = self.get_serializer(instance=page, many=True)
                return self.get_paginated_response(serializer.data)

            serializer = serializers[related_field](queryset, many=True)
            return Response(serializer.data)
        else:
            ValueError("{0} not found in the included_serializers inside the serializer class Model:{1} Serializer:{2}".format(related_field,str(self.queryset.model),str(self.serializer_class) ))
