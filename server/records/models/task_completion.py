from django.db import models
from .task import Task

class TaskCompletion(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    task = models.ForeignKey(Task, on_delete=models.PROTECT)
    # will need to do some validation
    # -> task type is selection
    # -> selection is valid option
    selection = models.IntegerField(blank=True, null=True) 
    response = models.TextField(blank=True, null=True)
    value = models.FloatField(blank=True, null=True)

