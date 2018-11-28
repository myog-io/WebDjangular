from rest_framework.serializers import ModelSerializer

from libs.core.cms.api.models.Menu import Menu


class MenuSerializer(ModelSerializer):
    """
    The serializer for Menu Objects
    """

    class Meta:
        model = Menu
        fields = '__all__'
