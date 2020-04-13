from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import ArrayField
User = get_user_model()

# Create your models here.


class Chatroom(models.Model):
    postcode = models.CharField(max_length=4, unique=True)
    users = models.ManyToManyField(User, related_name='chatroom', blank=True)

    def __str__(self):
        return self.postcode

# alternative option to ManyToMany Field:
class Intermediary(models.Model):
    user = models.ForeignKey(User, related_name='medium', on_delete=models.CASCADE)
    Chatroom = models.ForeignKey(Chatroom, related_name='medium', on_delete=models.CASCADE)


class Post(models.Model):
    user = models.ForeignKey(User, related_name='post', on_delete=models.CASCADE)
    chatroom = models.ForeignKey(Chatroom, related_name='chatroom', on_delete=models.CASCADE)
    text = models.CharField(max_length=2000)
    time_stamp = models.DateTimeField(auto_now_add=True, null=True)
    is_swapped = models.BooleanField(default=False)

    def __str__(self):
        return self.user


class Comment(models.Model):
    user = models.ForeignKey(User, related_name='comment', on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='comment', on_delete=models.CASCADE)
    text = models.CharField(max_length=2000)
    time_stamp = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.user
