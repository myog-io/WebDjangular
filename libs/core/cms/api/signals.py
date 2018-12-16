from django.db.models.signals import ModelSignal

pre_get_page = ModelSignal(providing_args=["request", "args", "kwargs"], use_caching=True)
post_get_page = ModelSignal(providing_args=["instance", "request", "args", "kwargs"], use_caching=True)
