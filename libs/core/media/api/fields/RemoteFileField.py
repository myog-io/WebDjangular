from django.db import models
from webdjango.Tools import Tools
from webdjango.models.Core import CoreConfig
from libs.core.media.api.configs import CONFIG_STORAGE_CLASS, CONFIG_STORAGE_KEY, CONFIG_STORAGE_NAME, CONFIG_STORAGE_CONTAINER_NAME


class RemoteFileField(models.FileField):
    description = "An object that stores the file in the blob storage and set the column value to the file name"
    @property
    def attr_class(self):
        return self.attribute_class

    @attr_class.setter
    def attr_class(self, value):
        self.attribute_class = value

    storage = None
    storageClassPath = 'libs.core.media.api.storage'

    def __init__(self, verbose_name=None, attr_class=None, name=None, upload_to='', storage=None, **kwargs):
        if attr_class == None:
            attr_class = models.fields.files.FieldFile

        self.attr_class = attr_class
        # TODO: Chekc if The COFIG STORAGE CLASS IS WORKING

        if not storage and CoreConfig.read(CONFIG_STORAGE_CLASS):
            # Storage is not set, let's try to get the information
            storage = self.StorageClassReference(CoreConfig.read(CONFIG_STORAGE_CLASS))(
                accountKey=CoreConfig.read(CONFIG_STORAGE_KEY),
                accountName=CoreConfig.read(CONFIG_STORAGE_NAME),
                containerName=CoreConfig.read(CONFIG_STORAGE_CONTAINER_NAME)
            )
        else:
            storage = self.StorageClassReference('ChunkFileStorage')()
        super(RemoteFileField, self).__init__(
            verbose_name, name, upload_to, storage, **kwargs)

    def StorageClassReference(self, className=None):
        return Tools.getClassReference(self.storageClassPath + '.' + str(className), str(className))

    def __str__(self):
        return str(self.name)
