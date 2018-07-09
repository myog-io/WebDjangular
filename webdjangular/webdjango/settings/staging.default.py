"""
Django settings for webdjangular project Staging environment.

"""


from .base import *

DEBUG = True

SECRET_KEY = "__CHANGE_ME__"


INSTALLED_APPS += [

]

DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'NAME': 'your-db-name',
    }
}