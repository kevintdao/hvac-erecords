from base.models import Company
from django.db import models
from rolepermissions.checkers import has_role


class TaskQuerySet(models.QuerySet):
    def for_user(self, user):
        if has_role(user,['company','technician']):
            return self.filter(company=user.company)
        elif has_role(user,'admin'):
            return self.all()
        else:
            return self.none()

    def for_reports(self):
        return self.filter(company__isnull=True)

class Task(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    rule = models.JSONField()

    objects = TaskQuerySet.as_manager()
