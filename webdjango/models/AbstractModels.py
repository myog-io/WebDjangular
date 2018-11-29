from django.core.validators import MaxLengthValidator
from django.utils.translation import check_for_language
from djongo import models
from djongo.models.json import JSONField
from json.decoder import JSONDecodeError
from webdjango.models.Core import CoreConfig

import json
from webdjango.configs import DEFAULT_I18N


def validate_i18n(code):
    return code and check_for_language(code)


def default_i18n():
    code = CoreConfig.read(DEFAULT_I18N)
    return code or "en"


class TranslationModel(models.Model):
    i18n_fields = []
    language = models.CharField(
        max_length=5, blank=False, default=default_i18n,
        validators=[validate_i18n]
    )
    # as per https://docs.mongodb.com/manual/tutorial/specify-language-for-text-index/
    translation = JSONField(null=True,default=None)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def get_current_i18n(self, *args, **kwargs):
        lang = default_i18n()
        if 'request' in kwargs:
            request = kwargs.pop('request')
            lang = request.LANGUAGE_CODE
        # TODO CHECK COOKIE, AND OTHER METHODS
        return lang

    def __init__(self, *args, **kwargs):
        super(TranslationModel, self).__init__(*args, **kwargs)
        lang = self.get_current_i18n(*args, **kwargs)
        if self.language and self.language != lang:
            # Order, check and update the language of the self
            t_index = next((index for (index, d) in enumerate(self.translation) if d['language'] == lang), None)
            if t_index is not None:
                # This way the user will see the langugage that he's receiving
                self.language = lang
                # Setting the Fields
                i18nobj = self.translation[t_index]
                for field in self.i18n_fields:
                    if field in i18nobj:
                        setattr(self, field, i18nobj[field])


    def save(self, *args, **kwargs):
        '''
        Overriding Save function
        Based on the ATTR i18n_fields, we will save the translations
        '''
        # 1st we check the current language of the request
        lang = self.get_current_i18n(*args, **kwargs)

        # Getting the Original Value of the entiity
        original = type(self).objects.get(pk=self.pk)
        # If there is a language on the model, and the language of the request is not the same as the model we
        # will save the data that came in the fields inside the Translation Json
        if original.language:
            if original.language != lang:
                i18nobj = {}
                i18nobj['language'] = lang
                # Setting the Fields
                for field in self.i18n_fields:
                    i18nobj[field] = getattr(self, field)
                    # Ignoring the Value in the model
                    setattr(self, field, getattr(original, field))

                self.translation = original.translation
                if not self.translation:
                    # If there is no Translation created we will create and add to the translation propety
                    self.translation = []
                    self.translation.append(i18nobj)
                else:
                    # If there is a translation we need to search on the field to check if the transtion is already there in the object
                    t_index = next((index for (index, d) in enumerate(self.translation) if d['language'] == lang), None)
                    if t_index is not None:
                        self.translation[t_index].update(i18nobj)
                    else:
                        self.translation.append(i18nobj)

        else:
            self.language = lang
        super(TranslationModel, self).save(*args, **kwargs)

    class Meta:
        abstract = True


class DateModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SeoModel(models.Model):
    seo_title = models.CharField(
        max_length=70, blank=True, null=True,
        validators=[MaxLengthValidator(70)])
    seo_description = models.CharField(
        max_length=300, blank=True, null=True,
        validators=[MaxLengthValidator(300)])

    class Meta:
        abstract = True
