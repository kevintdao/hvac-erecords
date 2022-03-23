from django.db import DataError
from django.test import TestCase

from records.models import Task

class TaskModelTests(TestCase):
    fixtures = ['test_data.json'] 

    def test_created_valid_task(self):
        Task.objects.create(title='Check refrigerant level',description='report a value based response for refrigerant level')
        self.assert_(Task.objects.filter(title='Check refrigerant level',description='report a value based response for refrigerant level').exists())