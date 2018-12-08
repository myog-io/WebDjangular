from djongo import models
from django import forms
from webdjango.models.AbstractModels import DateTimeModel

class NumberRange(models.Model):
    '''
    Number Rengy Model is a entry from city, will have the range of ceps or range of street house numbers
    '''
    start = models.IntegerField()
    end = models.IntegerField()


    class Meta:
        abstract = True

    def __str__(self):
        return "start:{} - end{}".format(self.start,self.end)

class NumberRangeForm(forms.ModelForm):
    class Meta:
        model = NumberRange
        fields = (
            'start', 'end'
        )



class Streets(models.Model):
    '''
    This Streets will be use to check if the Address Typed by the user on the frontend is in our database
    If it's in our database we will check the numbers range to check if in his number if they have Fiber/Cable Internet
    '''
    name = models.CharField(max_length=255)
    short_name = models.CharField(max_length=255)
    numbers = models.ArrayModelField(
        model_container = NumberRange,
        model_form_class =NumberRangeForm
    )
    class Meta:
        abstract = True

    def __str__(self):
        return self.name

class StreetsForm(forms.ModelForm):
    class Meta:
        model = Streets
        fields = (
            'name','short_name', 'numbers'
        )


class City(DateTimeModel):
    name = models.CharField(max_length=255)
    short_name = models.CharField(max_length=255, null=True, default=None)
    code = models.SlugField(null=True, default=None)
    postal_codes = models.ArrayModelField(
        model_container=NumberRange,
        model_form_class=NumberRangeForm,
        null = True,
        default = None
    )
    streets = models.ArrayModelField(
        model_container=Streets,
        model_form_class=StreetsForm,
        null = True,
        default = None,
    )
    def __str__(self):
        return self.name

    class Meta:
        db_table = 'provider_city'
        ordering = ['-id']
