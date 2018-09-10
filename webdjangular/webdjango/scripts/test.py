from webdjangular.apps.users.models import User
from django.contrib.auth.models import Group


def run():
	Group.objects.create(name="Administrators")
	Group.objects.create(name="Sub-Administrators")

	#group1 = Group.objects.get(pk=1);
	#group2 = Group.objects.get(pk=2);
	#user = User.objects.get(pk=6);
	

	#group1.user_set.remove(user);
	#group2.user_set.add(user);
