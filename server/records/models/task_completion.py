from django.db import models
from .task import Task
from .service_visit import ServiceVisit

class TaskCompletion(models.Model):
    task = models.ForeignKey(Task, on_delete=models.PROTECT)
    service_visit = models.ForeignKey(ServiceVisit, on_delete=models.PROTECT)
    completed_at = models.DateTimeField()
    selection = models.IntegerField(null=True, blank=True) 
    response = models.TextField(blank=True)
    value = models.FloatField(null=True, blank=True)

