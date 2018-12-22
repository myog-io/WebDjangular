from django.db import models
from django import forms
from webdjango.models.AbstractModels import BaseModel
from django_mysql.models import DynamicField


class City(BaseModel):
    name = models.CharField(max_length=255)
    short_name = models.CharField(max_length=255, null=True, default=None)
    code = models.SlugField(null=True, default=None, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'provider_city'
        ordering = ['-created']


class PostalCodeRange(BaseModel):
    start = models.IntegerField(null=True, default=None)
    end = models.IntegerField(null=True, default=None)
    city = models.ForeignKey(
        'City', related_name='postal_codes', on_delete=models.CASCADE)

    class Meta:
        db_table = 'provider_city_postal_codes'
        ordering = ['-created']

class Street(BaseModel):
    '''
    This Streets will be use to check if the Address Typed by the user on the frontend is in our database
    If it's in our database we will check the numbers range to check if in his number if they have Fiber/Cable Internet
    '''
    name = models.CharField(max_length=255)
    short_name = models.CharField(max_length=255)
    city = models.ForeignKey(City, related_name='streets',
                             on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'provider_city_street'
        ordering = ['-created']


class NumberRange(BaseModel):
    start = models.IntegerField(null=True, default=None)
    end = models.IntegerField(null=True, default=None)
    street = models.ForeignKey(
        Street, related_name='numbers', on_delete=models.CASCADE)

    class Meta:
        db_table = 'provider_city_street_numbers'
        ordering = ['-created']
