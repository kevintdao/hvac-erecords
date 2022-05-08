from django.db import models
from .task import Task
from .service_visit import ServiceVisit
from rolepermissions.checkers import has_role


class TaskCompletionQuerySet(models.QuerySet):
    def for_user(self, user):
        if has_role(user, ["company", "technician"]):
            tasks = Task.objects.filter(company=user.company)
            return self.filter(task__in=tasks)
        elif has_role(user, "admin"):
            return self.all()
        else:
            return self.none()


class TaskCompletion(models.Model):
    task = models.ForeignKey(Task, on_delete=models.PROTECT)
    service_visit = models.ForeignKey(
        ServiceVisit, on_delete=models.PROTECT, related_name="completions"
    )
    completed_at = models.DateTimeField()
    selection = models.IntegerField(null=True, blank=True)
    response = models.TextField(blank=True)
    value = models.FloatField(null=True, blank=True)

    objects = TaskCompletionQuerySet.as_manager()
