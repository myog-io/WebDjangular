from django.utils.translation import ugettext as _
from rest_framework.serializers import CharField
from rest_framework.serializers import Serializer
from rest_framework.serializers import ValidationError
from datetime import datetime, timedelta
from ..models.ForgetPassword import ForgetPassword
from ..models.User import User


class SetPasswordSerializer(Serializer):
    """
    The serializer for Set a new password based on ForgetPassword
    """
    
    key = CharField(max_length=None, min_length=None, allow_blank=False)
    
    
    class Meta:
        fields = ('key', 'password')
    
    def validate(self, attrs):
        """
        Check key is found in Forget Password and it was created in one hour
        :param attrs:
        :return:
        """
        time_threshold = datetime.now() - timedelta(hours=1)
        forget_password = ForgetPassword.objects.filter(id=attrs.get("key"), created__gt=time_threshold).first()
        if forget_password is None:
            msg = _('Set password invalid')
            raise ValidationError(msg)
        
        attrs['forget_password'] = forget_password
        return attrs
