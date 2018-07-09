from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin

from .UserManager import UserManager

class User(AbstractBaseUser, PermissionsMixin):
    """
    The User model
    """
    
    class Meta:
        db_table = 'users'
    
    first_name = models.CharField(max_length=60)
    middle_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)
    username = models.CharField(max_length=60, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    mobile = models.CharField(max_length=64, null=True, blank=True, default=None)
    is_tfa_enabled = models.BooleanField(default=False)
    is_email_verified = models.BooleanField(default=False)
    is_mobile_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'username'
    
    """
    A list of fields required when creating an user via `createsuperuser`
    USERNAME_FIELD and password are already required
    """
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email']
    
    def get_full_name(self):
        """
        Use to get the user full name.
        :return: string
        """
        return self.first_name + ' ' + self.middle_name + ' ' + self.last_name
    
    def get_short_name(self):
        """
        Use to get the user's name without middle name.
        :return: string
        """
        return self.first_name + ' ' + self.last_name
    
    def __str__(self):
        """
        Django uses this when it needs to convert the object to a string
        :return: string
        """
        return self.email
