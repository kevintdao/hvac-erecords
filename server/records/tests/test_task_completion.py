from django.db import DataError
from django.test import TestCase

from records.models import TaskCompletion, Task

class TaskCompletionModelTests(TestCase):
    fixtures = ['test_data.json', 'test_data_records.json'] 
    
    def test_created_valid_task_completion(self):
        TaskCompletion.objects.create(task=Task.objects.first(), response = "Good condition")
        self.assert_(TaskCompletion.objects.filter(response = "Good condition").exists())