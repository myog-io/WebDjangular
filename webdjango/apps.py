from django.apps import AppConfig


class WebdjangoConfig(AppConfig):
    name = 'webdjango'
    verbose_name = 'webdjango'
    label = 'webdjango'

    def ready(self):
        import webdjango.signals.CoreSignals
        import webdjango.signals.EmailConfigRegisterSignals
