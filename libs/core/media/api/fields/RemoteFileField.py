from django.db import models
from webdjango.Tools import Tools
from webdjango.models.Core import CoreConfig
from libs.core.media.api.configs import MEDIA_CONFIG_GROUP_SLUG, CONFIG_STORAGE_CLASS, CONFIG_STORAGE_KEY, CONFIG_STORAGE_NAME, CONFIG_STORAGE_CONTAINER_NAME, CONFIG_STORAGE_EXTERNAL_URL


class RemoteFileField(models.FileField):
    description = "An object that stores the file in the blob storage and set the column value to the file name"
    @property
    def attr_class(self):
        return self.attribute_class

    @attr_class.setter
    def attr_class(self, value):
        self.attribute_class = value
    storage_config = None
    storage = None
    storageClassPath = 'libs.core.media.api.storage'
    def __init__(self, verbose_name=None, attr_class=None, name=None, upload_to='', storage=None, **kwargs):
        if attr_class == None:
            attr_class = models.fields.files.FieldFile
        
        self.attr_class = attr_class
        
        # TODO: Check if The COFIG STORAGE CLASS IS WORKING
        self.storage_config = CoreConfig.read(MEDIA_CONFIG_GROUP_SLUG)
        if not storage and self.storage_config and self.storage_config[CONFIG_STORAGE_CLASS]:
            # TODO Validate This on Save, When Saving we have to Refresh This Configuration as well.
            # Storage is not set, let's try to get the information
            storage = self.StorageClassReference(self.storage_config[CONFIG_STORAGE_CLASS])(
                **self.storage_config
            )

        else:
            storage = self.StorageClassReference('ChunkFileStorage')()

        super(RemoteFileField, self).__init__(
            verbose_name, name, upload_to, storage, **kwargs)

    def StorageClassReference(self, className=None):
        return Tools.getClassReference(self.storageClassPath + '.' + str(className), str(className))


    def pre_save(self, model_instance, add):
        if not model_instance.pk and CONFIG_STORAGE_CLASS is not None and self.storage_config[CONFIG_STORAGE_CLASS]:
            model_instance.storage_name = self.storage_config[CONFIG_STORAGE_CLASS]
        file = super().pre_save(model_instance, add)
        return file

    #def __str__(self):
    #    return '' #str(sel)
