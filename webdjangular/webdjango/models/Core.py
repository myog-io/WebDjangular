from django.core.exceptions import ObjectDoesNotExist
from django.core.validators import validate_slug
from djongo import models


class Website(models.Model):
    """
    Configuration for Future MultiSite
    """
    domain = models.URLField(unique=True)
    code = models.SlugField(validators=[validate_slug], unique=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    @staticmethod
    def getCurrentWebsite():
        return Website.objects.first()
        # TODO: Logic to get the current website based on route or domain or something like this, for now i will return the first we fint

    def __str__(self):
        return self.domain


class CoreConfig(models.Model):
    """
    Core Config Holds Some Information for the Beggening of the application
    """
    slug = models.SlugField(max_length=200, validators=[
                            validate_slug], unique=True)
    value = models.TextField(max_length=500)
    website = models.ForeignKey(
        Website, on_delete=models.CASCADE, null=False, related_name="Configs", default=1)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    @staticmethod
    def read(slug,website):
        try:
            if website:
                return CoreConfig.objects.find(slug= slug, website= website)
            else: 
                website = Website.getCurrentWebsite()
                return CoreConfig.objects.find(slug= slug, website= website)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def write(slug, value):
        p, created = CoreConfig.objects.get_or_create(slug= slug, value= value)
        return created

    class Meta:
        db_table = 'core_config'
        permissions = (("list_core_config", "Can list core_config"),)

    def __str__(self):
        return self.slug


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
        permissions = (("list_core_authors", "Can list core_authors"),)

    def __str__(self):
        return self.name


class App(models.Model):
    """
    Core Apps, this model is used to check the installed Apps and check the actives one
    """
    slug = models.SlugField(max_length=100, validators=[
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
    slug = models.SlugField(max_length=100, validators=[
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
        permissions = (("list_core_themes", "Can list core_themes"),)
