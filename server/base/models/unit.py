from django.db import models
from .building_manager import *
from .building import *
from rolepermissions.checkers import has_role

class UnitQuerySet(models.QuerySet):
    def for_user(self, user):
        if has_role(user,['company', 'technician']):
            managers = BuildingManager.objects.filter(company=user.company)
            buildings = Building.objects.filter(manager__in=managers)
            return self.filter(building__in=buildings)
        elif has_role(user,'manager'):
            manager = user.managers.first()
            buildings = Building.objects.filter(manager=manager)
            return self.filter(building__in=buildings)
        elif has_role(user,'admin'):
            return self.all()
        else:
            return self.none()

class Unit(models.Model):
    building = models.ForeignKey(Building, on_delete=models.CASCADE)
    external_id = models.CharField(max_length=128, blank=True)
    category = models.CharField(max_length=255)
    serial_number = models.CharField(max_length=255)
    model_number = models.CharField(max_length=255)
    manufacturer = models.CharField(max_length=255)
    production_date = models.DateField(null=True)
    installation_date = models.DateField(null=True)

    objects = UnitQuerySet.as_manager()