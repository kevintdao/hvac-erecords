from django.db import models
from rolepermissions.checkers import has_role

from .user import User

class CompanyQuerySet(models.QuerySet):
    def for_user(self, user):
        if has_role(user, 'admin'):
            return self.all()
        else:
            return self.none()

class Company(models.Model):
    users = models.ManyToManyField(User, related_name="company-user")
    name = models.CharField(max_length=255)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=16)
    country = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=32)

    objects = CompanyQuerySet.as_manager()