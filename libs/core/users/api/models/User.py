from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin

from django.db import models

from webdjango.models.AbstractModels import BaseModel
from webdjango.models.Address import Address
from .UserManager import UserManager


class User(BaseModel, AbstractBaseUser, PermissionsMixin):
    """
    The User model
    This model is also used to create customers, the customers not necessarely need to have an valid EMAIL Address
    But they can't login on the admin as well
    """

    class Meta:
        ordering = ['-created']
        db_table = 'users'
        unique_together = ('email', 'is_email_verified')

    first_name = models.CharField(max_length=60)
    middle_name = models.CharField(max_length=60, default=None, blank=True, null=True)
    last_name = models.CharField(max_length=60)
    username = models.CharField(max_length=60, unique=True)
    email = models.EmailField(max_length=255, unique=False)
    mobile = models.CharField(max_length=64, null=True, blank=True, default=None)
    password = models.CharField(max_length=255, null=True)
    is_tfa_enabled = models.BooleanField(default=False, blank=True)
    is_email_verified = models.BooleanField(default=False, blank=True)
    is_mobile_verified = models.BooleanField(default=False, blank=True)
    is_active = models.BooleanField(default=True, blank=True)
    is_staff = models.BooleanField(default=False, blank=True)
    default_shipping_address = models.ForeignKey(
        Address, related_name='+', null=True, blank=True,
        on_delete=models.SET_NULL)
    default_billing_address = models.ForeignKey(
        Address, related_name='+', null=True, blank=True,
        on_delete=models.SET_NULL)
    # default_shipping_address =
    # default_billing_address =

    objects = UserManager()

    USERNAME_FIELD = 'username'

    """
    A list of fields required when creating an user via `createsuperuser`
    USERNAME_FIELD and password are already required
    """
    REQUIRED_FIELDS = ['first_name', 'last_name','email']
    
    @property
    def full_name(self):
        if self.first_name or self.last_name:
            return ('%s %s' % (self.first_name, self.last_name)).strip()
        if self.default_billing_address:
            first_name = self.default_billing_address.first_name
            last_name = self.default_billing_address.last_name
            if first_name or last_name:
                return ('%s %s' % (first_name, last_name)).strip()
        return self.email

    @property
    def name(self):
        """
        Use to get the user's name without middle name.
        :return: string
        """
        return self.first_name + ' ' + self.last_name

    def customers(self):
        return self.get_queryset().filter(
            Q(is_staff=False) | (Q(is_staff=True) & Q(orders__isnull=False)))

    def staff(self):
        return self.get_queryset().filter(is_staff=True)


    def __str__(self):
        """
        Django uses this when it needs to convert the object to a string
        :return: string
        """
        return self.email
