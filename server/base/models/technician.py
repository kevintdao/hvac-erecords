from django.db import models
from django.contrib.auth.models import User

class Technician(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=1)
    company_id = models.IntegerField()
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=32)
    license_number = models.IntegerField()
