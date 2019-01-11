import os
import json
from json.decoder import JSONDecodeError
from django.conf import settings


CONFIG_FILE_NAME = "wda_config.json"

# from webdjango.utils.DynamicLoader import DynamicLoader


class DynamicLoader():

    @staticmethod
    def get_config(directory):
        configData = []
        for themeFolder in os.listdir(directory):
            themeConfigFile = os.path.join(
                directory, os.path.join(themeFolder, CONFIG_FILE_NAME))
            if os.path.isfile(themeConfigFile):
                with open(themeConfigFile) as f:
                    try:
                        data = json.load(f)
                    except JSONDecodeError:
                        print("File " + themeConfigFile + " malformated")
                        raise

                    configData.append(data)
        return configData

    @staticmethod
    def get_plugins_config():
        return DynamicLoader.get_config(settings.PLUGIN_DIR)

    @staticmethod
    def get_themes_config():
        return DynamicLoader.get_config(settings.THEME_DIR)
