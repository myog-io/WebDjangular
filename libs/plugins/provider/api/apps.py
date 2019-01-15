from django.apps import AppConfig

class ProviderConfig(AppConfig):
    name = 'libs.plugins.provider.api'
    verbose_name = 'provider'
    label = 'provider'

    def ready(self):
        import libs.plugins.provider.api.signals.PageRedirectSignals
        import libs.plugins.provider.api.signals.FieldsToProductSignals
