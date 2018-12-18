from django.apps import AppConfig


class CMSConfig(AppConfig):
    name = 'libs.core.cms.api'
    verbose_name = 'cms'
    label = 'cms'

    def ready(self):
        '''
        We need to Import  signals related to CMS
        '''
        import libs.core.cms.api.signals


