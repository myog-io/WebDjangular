import uuid

from djongo.models import Model, ForeignKey, UUIDField, DateTimeField, CASCADE


class ForgetPassword(Model):
    """
    ForgetPassword id a model in order to store an uuid and the user.
    Web Djangular sends this uuid to user emails. Then the user can set a new password and the ForgetPassword entity is deleted
    The ForgetPassword lasts for 1 hour, then the row on database is deleted.
    """
    id = UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = ForeignKey('User', on_delete=CASCADE, null=False, related_name="User", default=0)
    created = DateTimeField(auto_now_add=True)
