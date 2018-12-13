from django.contrib.auth import authenticate
from django.utils.translation import ugettext as _
from rest_framework import serializers
from rest_framework_jwt.serializers import JSONWebTokenSerializer as JWTSerializer
from rest_framework_jwt.settings import api_settings

from ..models.User import User


jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
jwt_get_username_from_payload = api_settings.JWT_PAYLOAD_GET_USERNAME_HANDLER


class JSONWebTokenSerializer(JWTSerializer):
    """
    Overwrite the JSONWebTokenSerializer in order to authenticate
    with either username or email. Also change the username's case-sensitive to insensitive
    """
    username_field = "username_or_email"

    def validate(self, attrs):

        password = attrs.get("password")
        user = User.objects.filter(
            email__iexact=attrs.get("username_or_email")).first() or \
               User.objects.filter(username__iexact=attrs.get("username_or_email")).first()
        if user is not None:
            credentials = {
                'username': user.username,
                'password': password
            }
            if all(credentials.values()):
                user = authenticate(**credentials)
                if user:
                    if not user.is_active:
                        msg = _('User account is disabled.')
                        raise serializers.ValidationError(msg)

                    payload = jwt_payload_handler(user)
                    # Handling ObjectId
                    payload['user_id'] = str(payload['user_id'])
                    return {
                        'token': jwt_encode_handler(payload),
                        'user': user
                    }
                else:
                    msg = _('Unable to log in with provided credentials.')
                    raise serializers.ValidationError(msg)

            else:
                msg = _('Must include "{username_field}" and "password".')
                msg = msg.format(username_field=self.username_field)
                raise serializers.ValidationError(msg)

        else:
            msg = _('Unable to log in with provided credentials.')
            raise serializers.ValidationError(msg)
