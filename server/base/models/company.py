from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=255)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=16)
    country = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=32)
