from django.utils.translation import ugettext as _
from rest_framework.serializers import EmailField
from rest_framework.serializers import ValidationError
from webdjango.serializers.WebDjangoSerializer import WebDjangoSerializer
from ..models.ForgetPassword import ForgetPassword
from ..models.User import User


class ForgetPasswordSerializer(WebDjangoSerializer):
    """
    The serializer for ForgetPassword Objects
    """

    email = EmailField(max_length=None, min_length=None, allow_blank=False)

    class Meta:
        model = ForgetPassword
        fields = ('id', 'email')

    def validate(self, attrs):
        """
        Check if the email is found and it is verified
        :param attrs:
        :return:
        """

        # TODO: is_email_verified=true
        user = User.objects.filter(email__iexact=attrs.get("email")).first()
        if user is None:
            msg = _('Sorry, email not found.')
            raise ValidationError(msg)

        attrs['user'] = user
        return attrs

    def create(self, validated_data):
        """
        create a ForgetPassword that contains a key to send to the user in order to enter a new password
        :param validated_data:
        :return: ForgetPassword Object
        """

        forget_password = ForgetPassword(user=validated_data['user'])
        forget_password.save()
        #  TODO: Send the email with this code
        return forget_password
