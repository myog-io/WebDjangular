from django.db import DEFAULT_DB_ALIAS, router
from django.db.models import signals
from django.dispatch import receiver

@receiver(signals.post_migrate)
def create_permissions(app_config, verbosity=2, interactive=True, using=DEFAULT_DB_ALIAS, **kwargs):
    from django.contrib.auth.models import Permission
    from django.contrib.contenttypes.models import ContentType

    if not router.allow_migrate(using, Permission):
        return
    
    permsToCreate = [
        {
            'content_type': ContentType.objects.get(model='group'),
            'codename': 'list_group',
            'name': 'Can list groups',
        }
    ]
    
    for perm in permsToCreate:
        if perm['content_type'] is not None:
            check = Permission.objects.filter(codename=perm['codename']);
            
            if check.count() == 0:
                Permission.objects.create(**perm);
