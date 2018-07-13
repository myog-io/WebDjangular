from djongo.models import Model, CharField, TextField, SlugField, DateTimeField, ForeignKey


class Page(Model):
    title = CharField(max_length=255)
    slug = SlugField(unique=True)
    content = TextField()
    created = DateTimeField(auto_now_add=True)
    updated = DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
