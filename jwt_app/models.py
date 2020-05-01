from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField

# Create your models here.


class User(AbstractUser):

    email = models.CharField(max_length=50, unique=True)
    favourites = ArrayField(models.IntegerField(
        blank=True, null=True), blank=True, null=True)
    postcode = models.CharField(max_length=4)
    image = models.CharField(max_length=1000, blank=True, null=True,
                             default="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRcEQfF7q7j163x2_R6mMHS2qLwq1CSKziwMtOPkTFAz2Zhjcy1&usqp=CAU")
