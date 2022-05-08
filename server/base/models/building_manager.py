from django.db import models
from rolepermissions.checkers import has_role

from .company import *
from .user import *


class BuildingManagerQuerySet(models.QuerySet):
    def for_user(self, user):
        if has_role(user, "company"):
            return self.filter(company=user.company)
        elif has_role(user, "admin"):
            return self.all()
        else:
            return self.none()


class BuildingManager(models.Model):
    users = models.ManyToManyField(User, related_name="managers")
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=32)

    objects = BuildingManagerQuerySet.as_manager()
