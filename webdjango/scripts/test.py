from libs.core.users.models import User
from django.contrib.auth.models import Group, Permission

def run():
	#Group.objects.create(name="Administrators")
	#Group.objects.create(name="Sub-Administrators")

	#group1 = Group.objects.get(pk=8);
	#group2 = Group.objects.get(pk=2);
	#user = User.objects.get(pk=6);
	

	#group1.user_set.remove(user);
	#group2.user_set.add(user);


	#group = Group.objects.get(pk=8);
	#permission = Permission.objects.all();
	#for perm in permission:
	#	group.permissions.add(perm);
	#

	user = User.objects.get(pk=6);
	user.set_password("admin");
	user.save();
