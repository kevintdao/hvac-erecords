from django.db import models
from base.models import Company

class Task(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    rule = models.JSONField()
