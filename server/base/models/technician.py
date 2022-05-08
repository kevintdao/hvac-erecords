from base.models import User
from django.db import models
from rolepermissions.checkers import has_role

from .company import *


class TechnicianQuerySet(models.QuerySet):
    def for_user(self, user):
        if has_role(user,'company'):
            return self.filter(company=user.company)
        elif has_role(user,'technician'):
            return self.filter(user=user)
        elif has_role(user,'admin'):
            return self.all()
        else:
            return self.none()

class Technician(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=32)
    license_number = models.IntegerField()

    objects = TechnicianQuerySet.as_manager()

    def full_name(self):
        return self.first_name + " " + self.last_name