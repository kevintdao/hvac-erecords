from django.db import models
from base.models import Technician, Unit
from .profile_plan import ProfilePlan

class ServiceVisit(models.Model):
    technician = models.ForeignKey(Technician, on_delete=models.SET_NULL, null=True, related_name='visits')
    unit = models.ForeignKey(Unit, on_delete=models.PROTECT, related_name='visits')
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True)
    plan = models.ForeignKey(ProfilePlan, on_delete=models.PROTECT)