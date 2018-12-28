"""
Django settings for webdjangular project Development environment.

"""


from .base import *

DEBUG = True

SECRET_KEY = "__CHANGE_ME__"


INSTALLED_APPS += [

]

DATABASES = {
    'default': {
        'ENGINE': 'django',
        'NAME': 'your-db-name',
    }
}