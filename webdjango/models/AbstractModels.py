from django.core.validators import MaxLengthValidator
from djongo import models


class BaseModel(models.Model):
    readonly_fields = ('_id', )

    _id = models.ObjectIdField(db_column='_id', primary_key=True, editable=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class PermalinkModel(models.Model):

    slug = models.SlugField(max_length=256)

    @property
    def absolute_url(self):
        return self.get_absolute_url()

    def get_absolute_url(self):
        #TODO:
        #return reverse(
        #    'product:category',
        #    kwargs={'slug': self.slug, 'category_id': self.id})
        return "TODO_URL"

    class Meta:
        abstract = True


class ActiveModel(models.Model):
    is_active = models.BooleanField(default=True)

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
