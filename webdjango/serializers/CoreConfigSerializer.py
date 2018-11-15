from rest_framework import serializers



class CoreConfigInputSerializer(serializers.Serializer):
    """
    Serializer to CoreConfigInput to tranform into JSON data
    """
    id = serializers.CharField()
    field_type = serializers.CharField()
    input_type = serializers.CharField()
    order = serializers.IntegerField()
    disabled = serializers.BooleanField()
    label = serializers.CharField()
    select_options = serializers.JSONField()
    placeholder = serializers.CharField()
    validation = serializers.JSONField()
    wrapperClass = serializers.CharField()
    group = serializers.SlugField()

class CoreConfigGroupSerializer(serializers.Serializer):
    """
    Serializer to CoreConfigGroup to transfor into JSON data
    """
    id = serializers.CharField()
    order = serializers.IntegerField()
    title = serializers.CharField()
    # inputs = CoreConfigInputSerializer(many=True, read_only=True)
