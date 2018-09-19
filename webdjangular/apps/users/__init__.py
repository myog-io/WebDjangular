from django.apps import apps
from django.db import DEFAULT_DB_ALIAS, router
from django.db.models import signals
from django.dispatch import receiver


@receiver(
    signals.post_migrate
)
def create_permissions(app_config, verbosity=2, interactive=True, using=DEFAULT_DB_ALIAS, **kwargs):
    try:
        Permission = apps.get_model('auth', 'Permission')
    except LookupError:
        return
 
    if not router.allow_migrate(using, Permission):
        return

    from django.contrib.auth import get_user_model, models as auth_app
    from django.contrib.auth.models import Group
    from django.contrib.contenttypes.models import ContentType
    from django.core.exceptions import ObjectDoesNotExist
    
    try:
        content_type = ContentType.objects.get(model='group')
        auth_app.Permission.objects.get_or_create(
            codename='list_group',
            name='Can list groups',
            content_type=content_type,
        )
    except ObjectDoesNotExist:
        return
    