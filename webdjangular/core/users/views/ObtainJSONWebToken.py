from datetime import datetime

from rest_framework import status
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.views import JSONWebTokenAPIView

from ..serializers.JSONWebTokenSerializer import JSONWebTokenSerializer

jwt_response_payload_handler = api_settings.JWT_RESPONSE_PAYLOAD_HANDLER

import json

class ObtainJSONWebToken(JSONWebTokenAPIView):
    serializer_class = JSONWebTokenSerializer
    
    
    def post(self, request, *args, **kwargs):
        if request.content_type == 'application/vnd.api+json':
            data = json.loads(request.body.decode());
        else:           
            data = request.data;
            

        serializer = self.get_serializer(data=data)
        
        if serializer.is_valid():
            user = serializer.object.get('user')

            token = None
            if user.is_tfa_enabled == True:
                """
                Do not return a valid token
                Send the TFA code then returns that requires the two factor authentication
                """
                # TODO: send the TFA code
                response_data = {
                    'token': token,
                    "require": 'two_factor_authentication'
                }
            elif user.is_email_verified:
                """
                Do not return a valid token
                Returns that requires a email verification on response
                """
                response_data = {
                    'token': token,
                    "require": 'verify_email'
                }
            else:
                token = serializer.object.get('token')
                response_data = jwt_response_payload_handler(token, user, request)
            
            response = Response(response_data)
            
            if api_settings.JWT_AUTH_COOKIE:
                expiration = (datetime.utcnow() + api_settings.JWT_EXPIRATION_DELTA)
                response.set_cookie(api_settings.JWT_AUTH_COOKIE, token, expires=expiration, httponly=True)
            return response
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

obtain_jwt_token = ObtainJSONWebToken.as_view()
