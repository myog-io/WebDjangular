from rest_framework import serializers



class CoreConfigInputSerializer(serializers.Serializer):
    """
    Serializer to CoreConfigInput to tranform into JSON data
    """
    id = serializers.CharField(read_only=True)
    field_type = serializers.CharField(read_only=True)
    input_type = serializers.CharField(read_only=True)
    order = serializers.IntegerField(read_only=True)
    disabled = serializers.BooleanField(read_only=True)
    label = serializers.CharField(read_only=True)
    select_options = serializers.JSONField(read_only=True)
    placeholder = serializers.CharField(read_only=True)
    validation = serializers.JSONField(read_only=True)
    wrapper_class = serializers.CharField(read_only=True)
    group = serializers.SlugField(read_only=True)
    value = serializers.CharField(read_only=True)
    ng_if = serializers.JSONField(read_only=True)


class CoreConfigGroupSerializer(serializers.Serializer):
    """
    Serializer to CoreConfigGroup to transfor into JSON data
    """
    id = serializers.CharField(read_only=True)
    order = serializers.IntegerField(read_only=True)
    title = serializers.CharField(read_only=True)
    value = serializers.JSONField()
    # inputs = CoreConfigInputSerializer(many=True, read_only=True)
