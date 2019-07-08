"""
Django settings for webdjangular project.

"""
import datetime
import os

SECRET_KEY = '__CHANGE_ME__'  # overwrite the SECRET KEY on live.py and development.py

BASE_DIR = os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))))

MEDIA_ROOT = os.path.join(BASE_DIR, 'files')  # 'data' is my media folder

MEDIA_URL = '/files/'

THEME_DIR = os.path.join(BASE_DIR, 'libs', 'themes')

PLUGIN_DIR = os.path.join(BASE_DIR, 'libs', 'plugins')

ANGULAR_APP_DIR = os.path.join(BASE_DIR, 'dist', 'apps')

DEBUG = False

ALLOWED_HOSTS = []
APPEND_SLASH = False

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sitemaps',
    'django.contrib.humanize',
    'django_prices',

    'django_mysql',
    'rest_framework',
    'rest_framework.authtoken',
    'django_filters',
    'webdjango',
    'rest_framework_json_api',
    'django_extensions',
    'libs.core.users.api',
    'libs.core.cms.api',
    'libs.core.analytics.api',
    'libs.core.media.api',
    # 'libs.core.forms.api',
    'libs.plugins.store.api',
    'libs.plugins.provider.api',

]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    #'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'webdjango.utils.middleware.CurrentWebsiteMiddleware',
    'webdjango.utils.middleware.DisableClientSideCachingMiddleware',
]

ROOT_URLCONF = 'webdjango.urls'

DATABASES = {
    'default': {
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'webdjango.utils.permissions.AuthenticatedViewsetPermission.AuthenticatedViewsetPermission',
        # 'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
    'PAGE_SIZE': 10,
    'EXCEPTION_HANDLER': 'rest_framework_json_api.exceptions.exception_handler',
    'DEFAULT_PARSER_CLASSES': (
        'rest_framework_json_api.parsers.JSONParser',
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.MultiPartParser'
    ),
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework_json_api.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ),
    'DEFAULT_METADATA_CLASS': 'rest_framework_json_api.metadata.JSONAPIMetadata',
    'DEFAULT_PAGINATION_CLASS': 'rest_framework_json_api.pagination.JsonApiPageNumberPagination',
    'TEST_REQUEST_RENDERER_CLASSES': ('rest_framework_json_api.renderers.JSONRenderer',),
    'TEST_REQUEST_DEFAULT_FORMAT': 'vnd.api+json',
    'DEFAULT_FILTER_BACKENDS': (
        'rest_framework_json_api.filters.OrderingFilter',
        'rest_framework_json_api.django_filters.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        # 'rest_framework_json_api.filters.QueryParameterValidationFilter',
    ),
    'SEARCH_PARAM': 'filter[search]',

}

EMAIL_BACKEND = 'webdjango.email.WebDjangoEmailBackend'

JWT_AUTH = {
    'JWT_ENCODE_HANDLER': 'rest_framework_jwt.utils.jwt_encode_handler',
    'JWT_DECODE_HANDLER': 'rest_framework_jwt.utils.jwt_decode_handler',
    'JWT_PAYLOAD_HANDLER': 'rest_framework_jwt.utils.jwt_payload_handler',
    'JWT_PAYLOAD_GET_USER_ID_HANDLER': 'rest_framework_jwt.utils.jwt_get_user_id_from_payload_handler',
    'JWT_RESPONSE_PAYLOAD_HANDLER': 'rest_framework_jwt.utils.jwt_response_payload_handler',
    'JWT_SECRET_KEY': '6wAp;?ffG9yh86ic,3HvfN2Ah5s3DH~s<(V)mi7#)7zai2cpfcS7Qt\\m:jjGi_sW',
    'JWT_GET_USER_SECRET_KEY': None,
    'JWT_PUBLIC_KEY': None,
    'JWT_PRIVATE_KEY': None,
    'JWT_ALGORITHM': 'HS256',
    'JWT_VERIFY': True,
    'JWT_VERIFY_EXPIRATION': True,
    'JWT_LEEWAY': 0,
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=60),  # 5 minutes
    'JWT_AUDIENCE': None,
    'JWT_ISSUER': None,
    'JWT_ALLOW_REFRESH': False,
    'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=60),
    'JWT_AUTH_HEADER_PREFIX': 'Bearer',
    'JWT_AUTH_COOKIE': None,
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d  (Duration %(relativeCreated)dms)  %(message)s'
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
        'django.server': {
            '()': 'django.utils.log.ServerFormatter',
            'format': '[{server_time}] {message}',
            'style': '{',
        }
    },
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse',
        },
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue',
        },
    },
    'handlers': {
        'console': {
            'level': 'INFO',
            'filters': ['require_debug_true'],
            'class': 'logging.StreamHandler',
        },
        'django.server': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'django.server',
        },
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        },
        'file_error': {
            'level': 'ERROR',
            #'filters': ['require_debug_false'],
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(BASE_DIR, 'logs', 'error.log'),
        },
        'file': {
            'level': 'DEBUG',
            'filters': ['require_debug_false'],
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(BASE_DIR, 'logs', 'debug.log'),
        },
    },
    'loggers': {
        '': {
            'handlers': ['console', 'mail_admins', 'file', 'file_error'],
            'level': 'INFO',
            'propagate': False,
        },
        'django': {
            'handlers': ['console', 'mail_admins', 'file', 'file_error'],
            'level': 'INFO',
        },
        'django.server': {
            'handlers': ['django.server', 'file_error'],
            'level': 'INFO',
            'propagate': False,
        },
        'root': {
            'handlers': ['console', 'mail_admins', 'file', 'file_error'],
            'level': 'DEBUG',
            'propagate': False,
        }
    }
}

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

AUTH_USER_MODEL = 'users.User'
