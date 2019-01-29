from django.db.models.signals import pre_init
from webdjango.signals.SerializerSignals import pre_init_serializer
from django.dispatch import receiver, Signal
from libs.plugins.store.api.models.Product import Product
from libs.plugins.store.api.serializers.ProductSerializer import ProductSerializer
from rest_framework_json_api import serializers

@receiver(pre_init,sender=Product)
def includeFieldToModel(sender, *args, **kwargs):
    # Not sure if this is the Correct Way but it's Working
    # TODO: Improve with a Query Parameter
    #request = kwargs['context']['request']
    #include_channel_count = request.GET.get('include_channel_count', False)
    #print(sender)
    sender.channel_count = property(lambda self: self.channels.count())
    sender.channel_hd_count = property(lambda self: self.channels.filter(types__contains="HD").count())


@receiver(pre_init_serializer, sender=ProductSerializer)
def includeFieldToSerialzier(sender, serializer, *args, **kwargs):
    # TODO: Improve based on Query Parameter Fields???
    if sender.included_serializers:
        sender.included_serializers['channels'] = 'libs.plugins.provider.api.serializers.ChannelSerializer.ChannelSerializer'
        sender.included_serializers['plan_types'] = 'libs.plugins.provider.api.serializers.PlanTypeSerializer.PlanTypeSerializer'
    serializer.fields['channel_count'] = serializers.IntegerField(read_only=True)
    serializer.fields['channel_hd_count'] = serializers.IntegerField(read_only=True)







