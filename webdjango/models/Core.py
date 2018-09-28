from django.core.exceptions import ObjectDoesNotExist
from django.core.validators import validate_slug
from djongo import models
from webdjango.utils.DynamicLoader import DynamicLoader
from distutils.version import LooseVersion
from dirtyfields import DirtyFieldsMixin

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

    class Meta:
        db_table = 'core_website'
        permissions = (("list_core_website", "Can list core_website"),)

    def __str__(self):
        return self.domain


class CoreConfig(models.Model):
    """
    Core Config Holds Some Information for the Beggening of the application
    """
    slug = models.SlugField(max_length=200, validators=[
                            validate_slug], unique=True)
    value = models.TextField(max_length=500, null=True)
    website = models.ForeignKey(
        Website, on_delete=models.CASCADE, null=False, related_name="Configs", default=1)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    @staticmethod
    def read(slug, website):
        try:
            if not website:
                website = Website.getCurrentWebsite()
            return CoreConfig.objects.filter(slug=slug, website=website).first().value
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def write(slug, value, website=None):
        if not website:
            website = Website.getCurrentWebsite()
        p, created = CoreConfig.objects.get_or_create(
            slug=slug, value=value, website=website)
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
        db_table = 'core_author'
        permissions = (("list_core_author", "Can list core_author"),)

    def __str__(self):
        return self.name


class Plugin(DirtyFieldsMixin, models.Model):
    """
    Core Plugin, this model is used to check the installed Plugin and check the actives one
    """
    slug = models.SlugField(max_length=100, validators=[
                            validate_slug], unique=True)
    name = models.CharField(max_length=100)
    author = models.ForeignKey(
        Author, on_delete=models.CASCADE, related_name='plugins')
    current_version = models.CharField(max_length=50,null=True)
    version = models.CharField(max_length=50)
    active = models.BooleanField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    @staticmethod
    def update_list():
        """
        Function to get all the new installed modules based on the configuration files of each plugin
        """
        plugins_config = DynamicLoader.getPluginsConfig()
        for config in plugins_config:
            ## Creating Author
            if config['author'] :
                author, created = Author.objects.get_or_create(config['author'])
            config['plugin']['author'] = author

            plugin, created = Plugin.objects.get_or_create(config['plugin'])
            if not created:
                # Item Created Before, let's check for the version difference
                if LooseVersion(config.plugin.version) > LooseVersion(plugin.current_version):
                    # Run Update Script (probably a migration + npm install with new requirements) and then, update the current version to the atual version
                    print("New Version of the Plugin")
            else:
                print("DO Nothing for now")

    class Meta:
        db_table = 'core_plugin'
        permissions = (("list_core_plugin", "Can list core_plugin"),)

    def __str__(self):
        return self.name


class Theme(DirtyFieldsMixin, models.Model):
    """
    Core Themes, this model is used to check the installed Themes and check the activated one
    """
    slug = models.SlugField(max_length=100, validators=[
                            validate_slug], unique=True)
    name = models.CharField(max_length=100)
    angular_module = models.CharField(max_length=100, null=False)
    author = models.ForeignKey(
        Author, on_delete=models.CASCADE, related_name='themes')
    parent_theme = models.ForeignKey(
        'Theme', on_delete=models.SET_NULL, related_name='children', null=True
    )
    version = models.CharField(max_length=50)
    current_version = models.CharField(max_length=50, null=True)
    active = models.BooleanField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    @staticmethod
    def get_active():
        return Theme.objects.filter(active=1).first()

    @staticmethod
    def update_list():
        """
        Function to get all the new installed modules based on the configuration files of each theme
        """
        active_theme = Theme.get_active()
        themes_config = DynamicLoader.getThemesConfig()
        for config in themes_config:
            ## Checking if Theme has a Parent Theme  
            if config['theme']['parent_theme']:
                parent_theme = Theme.objects.get(slug=config['theme'])
                if parent_theme:
                    config['theme']['parent_theme'] = parent_theme
                else: 
                    config['theme']['parent_theme'] = None
            else:
                config['theme']['parent_theme'] = None


            ## Creating Author
            if config['author'] :
                author, created = Author.objects.get_or_create(config['author'])
            config['theme']['author'] = author

            theme, created = Theme.objects.get_or_create(config['theme'])
            if not created:
                # Item Created Before, let's check for the version difference
                if theme.current_version and config['theme']['version']:
                    if LooseVersion(config['theme']['version']) > LooseVersion(theme.current_version):
                        # Run Update Script (probably a migration + npm install with new requirements) and then, update the current version to the atual version
                        print("New Version of the theme")
            else:
                if not active_theme:
                    print("No Theme is active, let's activate one")
                    theme.active = True
                    theme.save()
                    active_theme = theme

    class Meta:
        db_table = 'core_theme'
        permissions = (("list_core_theme", "Can list core_theme"),)
