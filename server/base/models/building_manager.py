from django.db import models

class BuildingManager(models.Model):
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=32)
    