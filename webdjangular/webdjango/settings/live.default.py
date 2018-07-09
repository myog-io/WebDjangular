"""
Django settings for webdjangular project Live environment.

"""


from .base import *

DEBUG = False

SECRET_KEY = "__CHANGE_ME__"


INSTALLED_APPS += [

]

DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'NAME': 'your-db-name',
    }
}