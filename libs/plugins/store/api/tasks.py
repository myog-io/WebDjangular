import datetime

from django.db.models import Count
from django.utils import timezone

from .models.Cart import Cart


def remove_duplicated_carts():
    dups = Cart.objects.values('token').annotate(
        count=Count('id')).values('token').filter(count__gt=1)
    print(dups)
    for cart in dups:
        print(vars(cart))


def remove_old_carts():
    expiration = timezone.now() - datetime.timedelta(days=7)
    Cart.objects.filter(created__lt=expiration).delete()
