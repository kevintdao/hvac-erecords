from django.db import models
from .building_manager import *

class Building(models.Model):
    manager = models.ForeignKey(BuildingManager, on_delete=models.CASCADE)
    site_name = models.CharField(max_length=255)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=16)
    country = models.CharField(max_length=255)