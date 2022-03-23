from django.db import models
from django.core.validators import BaseValidator

class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    rule = models.JSONField()
