from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import ValidationError

from django.contrib.auth.models import Group


class GroupSerializer(ModelSerializer):
    """
    The serializer for Group Objects
    """

    class Meta:
        model = Group
        fields = ('id', 'name')
    
    def validate_name(self, value):
        """
        Check if the name is unique case insensitive
        :param value: the name
        :return:
        """
        group = Group.objects.filter(name__iexact=value).first()
        if group is not None:
            raise ValidationError({'name':"Must be unique"})
        return value