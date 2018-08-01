from djongo.models import Model, CharField, TextField, SlugField, DateTimeField, BooleanField, ArrayModelField, ManyToManyField, DjongoManager

from webdjangular.apps.blog.models.Tag import Tag
from webdjangular.apps.users.models.User import User


class Post(Model):
    title = CharField(max_length=255)
    slug = SlugField(unique=True)
    content = TextField()
    is_draft = BooleanField(default=True)
    is_archived = BooleanField(default=False)
    published = DateTimeField(null=True)
    
    authors = ManyToManyField(User)
    tags = ArrayModelField(
        model_container=Tag
    )
    
    created = DateTimeField(auto_now_add=True)
    updated = DateTimeField(auto_now=True)
    
    # cover_img
    # authors (multiple)
    # categories
    # tags
    # layout
    # allow_comments
    
    objects = DjongoManager()
    
    def __str__(self):
        return self.title

    class JSONAPIMeta:
        resource_name = "posts"