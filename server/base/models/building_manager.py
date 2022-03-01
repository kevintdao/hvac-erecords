from django.db import models
from django.contrib.auth.models import User
class BuildingManager(models.Model):
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=32)
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=1)

    