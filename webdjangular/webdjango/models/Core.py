from django.core.validators import validate_slug
from djongo import models


class Author(models.Model):
    """
    Core Author, this model is used to show the Author information on the APP and Themes Acitivation Pages 
    """
    name = models.CharField(max_length=200)
    email = models.EmailField()
    website = models.URLField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'core_authors'

    def __str__(self):
        return self.name


class App(models.Model):
    """
    Core Apps, this model is used to check the installed Apps and check the actives one
    """
    slug = models.CharField(max_length=100, validators=[
                            validate_slug], unique=True)
    name = models.CharField(max_length=100)
    author = models.ForeignKey(
        Author, on_delete=models.CASCADE, related_name='apps')
    version = models.CharField(max_length=50)
    active = models.BooleanField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'core_apps'

    def __str__(self):
        return self.name


class Theme(models.Model):
    """
    Core Themes, this model is used to check the installed Themes and check the activated one
    """
    slug = models.CharField(max_length=100, validators=[
                            validate_slug], unique=True)
    name = models.CharField(max_length=100)
    author = models.ForeignKey(
        Author, on_delete=models.CASCADE, related_name='themes')
    version = models.CharField(max_length=50)
    active = models.BooleanField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    class Meta:
        db_table = 'core_themes'
