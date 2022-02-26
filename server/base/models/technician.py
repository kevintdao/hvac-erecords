from django.db import models

class Technician(models.Model):
    user_id = models.IntegerField()
    company_id = models.IntegerField()
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=32)
    license_number = models.IntegerField()
