from djongo.models import Model, CharField


class Tag(Model):
    
    name = CharField(max_length=255)
    
    def __str__(self):
        return self.name
