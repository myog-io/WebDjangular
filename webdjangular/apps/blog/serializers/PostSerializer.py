# from rest_framework.serializers import ModelSerializer
from rest_framework_json_api.serializers import ModelSerializer


from webdjangular.apps.blog.models.Post import Post


class PostSerializer(ModelSerializer):
    """
    The serializer for Blog Posts Objects
    """
    
    class Meta:
        model = Post
        # fields = ('title', 'slug', 'content', 'is_draft', 'is_archived', 'published', 'tags', 'authors')
        fields = ('title', 'content',)

