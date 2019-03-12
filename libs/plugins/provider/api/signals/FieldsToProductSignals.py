from django.db.models.signals import pre_init
from django.dispatch import receiver
from rest_framework_json_api import serializers

from libs.plugins.store.api.models.Product import Product
from libs.plugins.store.api.serializers.ProductSerializer import \
    ProductSerializer
#from libs.plugins.store.api.views.ProductViewSet import ProductFilter
from webdjango.signals.WebDjangoSignals import pre_init_serializer


@receiver(pre_init, sender=Product)
def includeFieldToModel(sender, *args, **kwargs):
    # Not sure if this is the Correct Way but it's Working
    # TODO: Improve with a Query Parameter
    #request = kwargs['context']['request']
    #include_channel_count = request.GET.get('include_channel_count', False)
    # print(sender)
    sender.channel_count = property(lambda self: self.channels.count())
    sender.channel_hd_count = property(
        lambda self: self.channels.filter(types__contains="HD").count())


@receiver(pre_init_serializer, sender=ProductSerializer)
def includeFieldToSerializer(sender, serializer, *args, **kwargs):
    # TODO: Improve based on Query Parameter Fields???
    if sender.included_serializers:
        sender.included_serializers['channels'] = 'libs.plugins.provider.api.serializers.ChannelSerializer.ChannelSerializer'
        sender.included_serializers['plan_types'] = 'libs.plugins.provider.api.serializers.PlanTypeSerializer.PlanTypeSerializer'
        sender.included_serializers['condos'] = 'libs.plugins.provider.api.serializers.CondoSerializer.CondoSerializer'
    serializer.fields['channel_count'] = serializers.IntegerField(
        read_only=True)
    serializer.fields['channel_hd_count'] = serializers.IntegerField(
        read_only=True)

    # TODO: Include Filters from post_init_filter


# @receiver(post_init_filter, sender=ProductFilter)
# def includeFieldToFilter(sender, filterset, *args, **kwargs):
#    print("--------------------")
#    print(vars(sender))
#    filterset.declared_filters['city'] = ModelChoiceFilter(
#        queryset=City.objects.all()
#    )
#    filterset.base_filters['city'] = filterset.declared_filters['city']
#    filterset.declared_filters['plan_types'] = ModelChoiceFilter(
#        queryset=PlanType.objects.all()
#    )
#    filterset.declared_filters['plan_types'] = filterset.declared_filters['plan_types']
#    print("################")
#    print(vars(filterset))
