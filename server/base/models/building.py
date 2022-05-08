from django.db import models
from .building_manager import *
from rolepermissions.checkers import has_role


class BuildingQuerySet(models.QuerySet):
    def for_user(self, user):
        if has_role(user, ["company", "technician"]):
            managers = BuildingManager.objects.filter(company=user.company)
            return self.filter(manager__in=managers)
        elif has_role(user, "manager"):
            manager = user.managers.first()
            return self.filter(manager=manager)
        elif has_role(user, "admin"):
            return self.all()
        else:
            return self.none()


class Building(models.Model):
    manager = models.ForeignKey(BuildingManager, on_delete=models.CASCADE)
    site_name = models.CharField(max_length=255)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=16)
    country = models.CharField(max_length=255)

    objects = BuildingQuerySet.as_manager()
