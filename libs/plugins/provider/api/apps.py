from django.apps import AppConfig

class ProviderConfig(AppConfig):
    name = 'libs.plugins.provider.api'
    verbose_name = 'Provider'
    label = 'provider'

    def ready(self):
        import libs.plugins.provider.api.signals.PageRedirectSignals
