from django.apps import AppConfig


class AnalyticsConfig(AppConfig):
    name = 'libs.core.analytics.api'
    verbose_name = 'analytics'
    label = 'analytics'

    def ready(self):
        """
        We need to Import signals related to Analytics
        :return:
        """
        import libs.core.analytics.api.signals

