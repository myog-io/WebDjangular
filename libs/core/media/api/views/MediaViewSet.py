import os

from django.core.exceptions import ValidationError
from django.core.files import File
from django.core.files.uploadedfile import UploadedFile
from django.core.validators import URLValidator
from django.http import JsonResponse, StreamingHttpResponse
from django_filters.rest_framework.backends import DjangoFilterBackend
from webdjango.filters import WebDjangoFilterSet
from libs.core.media.api.models.Media import Media
from libs.core.media.api.serializers.MediaSerializer import MediaSerializer
from rest_framework import filters, permissions, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import detail_route
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_json_api.views import ModelViewSet

from base64 import encode
from urllib.parse import urlparse
from urllib.request import urlopen, urlretrieve


class MediaFilter(WebDjangoFilterSet):
    class Meta:
        model = Media
        fields = {
            'id': ['in'],
            'alt': ['contains', 'exact'],
        }


class MediaViewSet(ModelViewSet):
    """
    Handles:
    Creating Pages
    Retrieve a list of Pages
    Retrieve a specific Page
    Update Pages
    Deleting Pages
    """
    resource_name = 'media'
    serializer_class = MediaSerializer
    queryset = Media.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter,
                       filters.OrderingFilter, DjangoFilterBackend)
    ordering_fields = '__all__'
    filter_class = MediaFilter
    search_fields = ('id', 'alt', 'created')
    permission_classes = (AllowAny,)  # Improve Allow

    def create(self, request, *args, **kwargs):
        data = request.data
        validator = URLValidator()
        if 'file'in data and isinstance(data['file'] , str):
            try:
                validator(data['file'])
                tempname, info = urlretrieve(data['file'])
                a = urlparse(data['file'])
                name = os.path.basename(a.path).encode('utf-8')
                data['file'] = UploadedFile(
                    file=File(open(tempname, 'rb')),
                    name=name,
                    content_type=info['Content-Type'],
                    size=info['Content-Length'],
                    charset=None)

                data['total_chunks'] = 1
                data['current_chunk'] = 1
            except ValidationError as e:
                print(e)
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @detail_route(methods=['get'])
    def publiclink(self, request, pk=None, *args, **kwargs):
        media = Media.objects.get(pk=pk)
        if media.pk != None:
            return Response({'url': media.file.url()})

    @detail_route(methods=['get'])
    def download(self, request, pk=None, *args, **kwargs):
        media = Media.objects.get(pk=pk)

        if media.pk != None:
            # creates the stream with azure
            media.file.openAsStream()

            response = StreamingHttpResponse(
                media.file, content_type=media.content_type)
            response['Content-Length'] = media.file.size
            response['Content-Disposition'] = 'attachment; filename=%s' % (
                media.name + "." + str(media.extension))

            return response
        else:
            return JsonResponse({'detail': 'Invalid Media'})
