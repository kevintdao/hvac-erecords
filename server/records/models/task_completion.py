from django.db import models
from .task import Task
from .service_visit import ServiceVisit

class TaskCompletion(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    task = models.ForeignKey(Task, on_delete=models.PROTECT)
    service_visit = models.ForeignKey(ServiceVisit, on_delete=models.PROTECT, null=True)
    # will need to do some validation
    # -> task type is selection
    # -> selection is valid option
    selection = models.IntegerField(blank=True, null=True) 
    response = models.TextField(blank=True, null=True)
    value = models.FloatField(blank=True, null=True)

