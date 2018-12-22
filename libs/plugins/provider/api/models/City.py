from django.db import models
from django import forms
from webdjango.models.AbstractModels import BaseModel
from django.contrib.postgres.fields import HStoreField



class City(BaseModel):
    name = models.CharField(max_length=255)
    short_name = models.CharField(max_length=255, null=True, default=None)
    code = models.SlugField(null=True, default=None, unique=True)
    postal_codes = HStoreField(blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'provider_city'
        ordering = ['-created']

class Streets(BaseModel):
    '''
    This Streets will be use to check if the Address Typed by the user on the frontend is in our database
    If it's in our database we will check the numbers range to check if in his number if they have Fiber/Cable Internet
    '''
    name = models.CharField(max_length=255)
    short_name = models.CharField(max_length=255)
    numbers = HStoreField(blank=True, null=True)
    city = models.ForeignKey(City, related_name='streets', on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'provider_streets'
        ordering = ['-created']

