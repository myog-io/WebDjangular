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
        'ENFORCE_SCHEMA': False,
        'ENGINE': 'django',
        'NAME': 'your-db-name',
    }
}
