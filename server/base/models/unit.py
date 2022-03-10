from django.db import models
from .building import *

class Unit(models.Model):
    external_id = models.CharField(max_length=128, blank=True)
    category = models.CharField(max_length=255)
    serial_number = models.CharField(max_length=255)
    model_number = models.CharField(max_length=255)
    manufacturer = models.CharField(max_length=255)
    production_date = models.DateField(null=True)
    installation_date = models.DateField(null=True)
    building = models.ForeignKey(Building, on_delete=models.CASCADE)