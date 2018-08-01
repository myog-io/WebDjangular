from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.viewsets import ModelViewSet

from webdjangular.webdjango.ultils.Pagination import DefaultPagination
from webdjangular.apps.blog.models.Post import Post
from webdjangular.apps.blog.serializers.PostSerializer import PostSerializer


class PostViewSet(ModelViewSet):
    """
    Handles:
    Creating Blog Posts
    Retrieve a list of Blog Posts
    Retrieve a specific Blog Post
    Update Blog Posts
    Deleting Blog Posts
    """

    resource_name = 'posts'
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = ()
    # pagination_class = DefaultPagination
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title', 'content')















