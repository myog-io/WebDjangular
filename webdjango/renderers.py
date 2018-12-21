from bson.objectid import ObjectId
from rest_framework.utils import encoders
from rest_framework_json_api import renderers


class JSONEncoder(encoders.JSONEncoder):
    """
    JSONEncoder subclass that knos ObjectId
    """
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super(JSONEncoder, self).default(obj)


class JSONRenderer(renderers.JSONRenderer):
    encoder_class = JSONEncoder
