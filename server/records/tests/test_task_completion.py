from django.db import DataError
from django.test import TestCase

from records.models import TaskCompletion, Task

from django.utils import timezone
from records.models import service_visit

from records.models.service_visit import ServiceVisit


class TaskCompletionModelTests(TestCase):
    fixtures = ["test_data.json", "test_data_records.json"]

    def test_created_valid_task_completion(self):
        TaskCompletion.objects.create(
            task=Task.objects.first(),
            service_visit=ServiceVisit.objects.first(),
            response="Good condition",
            completed_at=timezone.now(),
        )
        self.assert_(TaskCompletion.objects.filter(response="Good condition").exists())
