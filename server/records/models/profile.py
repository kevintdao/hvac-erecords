from django.db import models
from .task import Task
from base.models import Company

class Profile(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    tasks = models.ManyToManyField(Task, through='ProfileTask')
