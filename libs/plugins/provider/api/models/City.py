from djongo.models import Model
from django.db import models as djangoModels


class City(Model):
    name = djangoModels.CharField(max_length=255)
    created = djangoModels.DateTimeField(auto_now_add=True)
    updated = djangoModels.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'provider_city'
        ordering = ['-id']
        permissions = (("list_cities", "Can list cities"),)
