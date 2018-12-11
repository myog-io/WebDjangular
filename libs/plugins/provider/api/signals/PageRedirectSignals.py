from django.db.models.signals import post_init, pre_init
from django.dispatch import receiver, Signal
from libs.core.cms.api.models.Page import Page

@receiver(pre_init, sender=Page)
def redirectPage(sender, **kwargs):
    print(sender)
    print("here")


@receiver(post_init, sender=Page)
def postRedirectPage(sender, *args, **kwargs):

    print("here")
