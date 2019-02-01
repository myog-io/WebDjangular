from django.apps import AppConfig


class StoreConfig(AppConfig):
    name = 'libs.plugins.store.api'
    verbose_name = 'store'
    label = 'store'

    def ready(self):
        import libs.plugins.store.api.signals
