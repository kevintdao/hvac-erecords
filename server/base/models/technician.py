from django.db import models
from .company import *
# from django.contrib.auth.models import User
from base.models import User
class Technician(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=32)
    license_number = models.IntegerField()

    # def save(self, *args, **kwargs):
    #     User.objects.create_user(username="foo", password="bar")
    #     super(Technician, self).save(*args, **kwargs)
