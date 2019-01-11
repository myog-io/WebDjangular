

try:
    from webdjango.settings.local import *
except ImportError as e:
    raise ImportError("Missing File on webdjango/settings/local.py")

