from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import ValidationError

from ..models.User import User


class UserSerializer(ModelSerializer):
    """
    The serializer for User Objects
    """
    
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'first_name', 'last_name', 'password')
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }
    
    def validate_username(self, value):
        """
        Check if the username is unique case insensitive
        :param value: the username
        :return:
        """
        user = User.objects.filter(username__iexact=value).first()
        if user is not None:
            raise ValidationError("Username must be unique")
        return value
    
    def validate_email(self, value):
        """
        Check if the email is unique case insensitive AND if the email is already verified.
        When a new user is created, the is_email_verified is False. Then when the user verifies its email,
        we delete every user with its email and is_email_verified is False
        :param value: the username
        :return:
        """
        user = User.objects.filter(email__iexact=value, is_email_verified=True).first()
        if user is not None:
            raise ValidationError("email already registered")
        return value
    
    def validate_password(self, value):
        """
        Password validation:
        - at least 8 characters
        - at least 1 letter
        - at least 1 UPPERCASE
        - at least 1 digit
        - at least 1 special character
        - no spaces allowed
        :param value: the password
        :return: the password
        """
        
        if len(value) < 8:
            raise ValidationError("Password must have at least 8 characters")
        
        uppercase = 0
        lowercase = 0
        letters = 0
        digits = 0
        specials = 0
        spaces = 0
        
        for character in value:
            if character.isupper():
                uppercase += 1
                letters += 1
            elif character.islower():
                lowercase += 1
                letters += 1
            elif character.isdigit():
                digits += 1
            elif character.isspace():
                spaces += 1
            else:
                specials += 1
                
        if letters == 0:
            raise ValidationError("Password must have at least 1 letter")
        if uppercase == 0:
            raise ValidationError("Password must have at least 1 UPPERCASE letter")
        if digits == 0:
            raise ValidationError("Password must have at least 1 digit")
        if specials == 0:
            raise ValidationError("Password must have at least 1 special character")
        if spaces > 0:
            raise ValidationError("Password can not have spaces")
            
        return value
    
    def create(self, validated_data):
        """
        Create and return a new user
        :param validated_data:
        :return: User Object
        """
        
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        user.set_password(validated_data['password'])
        user.save()
        
        return user
