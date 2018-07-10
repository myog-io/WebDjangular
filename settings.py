

try:
    from webdjangular.webdjango.settings.local import *
except ImportError as e:
    raise ImportError("Missing File on webdjangular/webdjango/settings/local.py")

