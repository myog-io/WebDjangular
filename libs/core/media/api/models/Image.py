from django.db import models


class ImageSizes:
    SMALL = 'small'
    MEDIUM = 'medium'
    LARGE = 'large'
    CUSTOM = 'custom'
    ORIGINAL = 'original'

    CHOICES = [(SMALL, 'Small'),
               (MEDIUM, 'Medium'),
               (LARGE, 'Large'),
               (CUSTOM, 'Custom'),
               (ORIGINAL, 'Original')
               ]


class Image(models.Model):
    width = models.PositiveIntegerField()  # in pixels
    height = models.PositiveIntegerField()  # in pixels
    path = models.CharField(max_length=32)
    content_type = models.CharField(max_length=64, null=True, blank=True)
    extension = models.CharField(max_length=16, null=True, blank=True)
    bytes = models.BigIntegerField(null=True, blank=True)

    is_thumbnail = models.BooleanField(default=False)
    size = models.CharField(max_length=16, choices=ImageSizes.CHOICES)

    class Meta:
        abstract = True
