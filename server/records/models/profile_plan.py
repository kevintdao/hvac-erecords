from django.db import models
from .task import Task
from .profile import Profile
from base.models import Unit
from rolepermissions.checkers import has_role


class ProfilePlanQuerySet(models.QuerySet):
    def for_user(self, user):
        if has_role(user,['company','technician']):
            # Need to check profiles assigned to user's units
            units = Unit.objects.for_user(user)
            return self.filter(unit__in=units)
        elif has_role(user,'admin'):
            return self.all()
        else:
            return self.none()      

class ProfilePlan(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='plans')
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE, related_name='plans')
    start_date = models.DateField(null=True)
    end_date = models.DateField(null=True)
    is_required = models.BooleanField()
    is_repeating = models.BooleanField()
    
    objects = ProfilePlanQuerySet.as_manager()