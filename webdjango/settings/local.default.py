"""
Django settings for webdjangular project Live environment.

"""


from .base import *

'''
With debug turned off Django won't handle static files for you any more - your production web server (Apache or something) should take care of that.
https://stackoverflow.com/questions/5836674/why-does-debug-false-setting-make-my-django-static-files-access-fail
'''
DEBUG = False

SECRET_KEY = "__CHANGE_ME__"


INSTALLED_APPS += [

]
'''
To Receive email with bugs when the flag DEBUG = False
ADMINS = (
    ('Your Name', 'your@email.com'),
)
'''
DATABASES = {
    'default': {
        'ENFORCE_SCHEMA': False,
        'ENGINE': 'django',
        'NAME': 'your-db-name',
    }
}
