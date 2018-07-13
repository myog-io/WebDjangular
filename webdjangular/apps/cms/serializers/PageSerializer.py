from rest_framework.serializers import ModelSerializer

from ..models import Page


class PageSerializer(ModelSerializer):
    """
    The serializer for Pages Objects
    """
    
    class Meta:
        model = Page
        fields = ('title', ' slug', ' content')
