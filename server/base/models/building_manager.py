from django.db import models
from .company import *
from .user import *
# from django.contrib.auth.models import User
# from users.models import CustomUser
# from django.conf import settings
# User = settings.AUTH_USER_MODEL

class BuildingManager(models.Model):
    users = models.ManyToManyField(User)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=32)