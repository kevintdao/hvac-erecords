from django.db import models
from .task import Task
from base.models import Company, Building, Unit
from rolepermissions.checkers import has_role


class ProfileQuerySet(models.QuerySet):
    def for_user(self, user):
        if has_role(user, ["company", "technician"]):
            return self.filter(company=user.company)
        elif has_role(user, "manager"):
            return self.filter(company=user.company)  # probably don't want to do this
        elif has_role(user, "admin"):
            return Profile.objects.all()
        else:
            return Profile.objects.none()

    def for_reports(self):
        return self.filter(company__isnull=True, tag__isnull=False)


class Profile(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    tasks = models.ManyToManyField(Task, through="ProfileTask")

    # Tag should always be null unless it is for reporting
    tag = models.CharField(max_length=255, null=True, unique=True, default=None)

    objects = ProfileQuerySet.as_manager()
