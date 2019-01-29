import uuid

from django.db.models import ForeignKey, CASCADE
from webdjango.models.AbstractModels import BaseModel


class ForgetPassword(BaseModel):
    """
    ForgetPassword id a model in order to store an uuid and the user.
    Web Djangular sends this uuid to user emails. Then the user can set a new password and the ForgetPassword entity is deleted
    The ForgetPassword lasts for 1 hour, then the row on database is deleted.
    """
    user = ForeignKey('User', on_delete=CASCADE, null=False, related_name="User")

