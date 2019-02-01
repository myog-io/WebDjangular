from django.db import models
from .TranslationModel import TranslationModel


class Email(TranslationModel):
    subject = models.CharField(max_length=255, default="Label")
    code = models.SlugField(max_length=255, unique=True)
    content = models.TextField()

    i18n_fields = [
        'subject', 'val'
    ]

    def get_content(self, data):
        return self.content

    def get_subject(self, data):
        return self.subject

    class Meta:
        ordering = ['-created']