from django.db import models
from .task import Task
from .profile import Profile
from base.models import Unit

class ProfilePlan(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE, related_name='plans')
    start_date = models.DateField(null=True)
    end_date = models.DateField(null=True)
    is_required = models.BooleanField()
    is_repeating = models.BooleanField()
    