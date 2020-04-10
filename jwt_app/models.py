from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField

# Create your models here.

class User(AbstractUser):

    email = models.CharField(max_length=50, unique=True)
    favourites = ArrayField(models.IntegerField(blank=True, null=True))
    postcode = models.CharField(max_length=4, blank=True, null=True)