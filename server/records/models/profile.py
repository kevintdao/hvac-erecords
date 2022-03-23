from django.db import models
from .task import Task

class Profile(models.Model):
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    tasks = models.ManyToManyField(Task)
