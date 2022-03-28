from django.db import models
from base.models import Technician

class ServiceVisit(models.Model):
    technician = models.ForeignKey(Technician, on_delete=models.SET_NULL, null=True)
    # will need to link this with service order/profile plan
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True)
