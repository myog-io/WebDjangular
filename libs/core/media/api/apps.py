from django.apps import AppConfig


class MediaConfig(AppConfig):
    name = 'libs.core.media.api'
    label = 'media'
    def ready(self):
        '''
        We need to Import  signals related to media
        '''
        import libs.core.media.api.signals.RegisterConfig
