from django.contrib import admin

from webdjangular.apps.blog.models.Post import Post

admin.site.register((Post,))

