from django.dispatch import Signal

pre_init_serializer = Signal(providing_args=["serializer","instance","data","kwargs"], use_caching=True)
post_init_serializer = Signal(providing_args=["serializer","instance","data","kwargs"], use_caching=True)
