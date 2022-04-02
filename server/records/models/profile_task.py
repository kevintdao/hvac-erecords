from django.db import models
from .task import Task
from .profile import Profile

class ProfileTask(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    position = models.PositiveIntegerField()