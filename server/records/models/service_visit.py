from django.db import models
from base.models import Technician, Unit
from .profile_plan import ProfilePlan
from rolepermissions.checkers import has_role


class ServiceVisitQuerySet(models.QuerySet):
    def for_user(self, user):
        if has_role(user, ["company", "technician"]):
            technicians = Technician.objects.filter(company=user.company)
            return self.filter(technician__in=technicians)
        elif has_role(user, "admin"):
            return self.all()
        else:
            return self.none()


class ServiceVisit(models.Model):
    technician = models.ForeignKey(
        Technician, on_delete=models.PROTECT, related_name="visits"
    )
    unit = models.ForeignKey(Unit, on_delete=models.PROTECT, related_name="visits")
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True)
    plan = models.ForeignKey(ProfilePlan, on_delete=models.PROTECT)

    objects = ServiceVisitQuerySet.as_manager()
