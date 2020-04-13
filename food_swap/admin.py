from django.contrib import admin
from .models import Chatroom, Post, Comment

# Register your models here.
admin.site.register(Chatroom)
admin.site.register(Post)
admin.site.register(Comment)
