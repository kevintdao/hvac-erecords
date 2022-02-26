from django.db import models

class Technician(models.Model):
    name = models.CharField(max_length=255)
    technician_id = models.CharField(max_length=32)
    phone_number = models.CharField(max_length=32)
    # building = models.ForeignKey("Building", on_delete=models.SET_NULL, null=True)
    # to be added when Building CRUD is created.
