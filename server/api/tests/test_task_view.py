from django.urls import reverse
from rest_framework import status
from django.test import TestCase
from records.models import Task
import datetime

class TestTaskAPI(TestCase):
    fixtures = ['test_data.json', 'test_data_records.json']
    
    def setUp(self):
        self.data = {
			"company": 1,
			"title":  "Unit in good condition",
			"description":  "choose if the condition is in a satisfactory condition",
            "rule":  '{	"type": "1", "name": "response" }'
        }
        self.response = self.client.post(
            reverse('tasks-list'),
            self.data,
            format="json"
        )

    def test_api_create_task(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 2)
        self.assertEqual(Task.objects.last().title, 'Unit in good condition')
        print(Task.objects.first())

    def test_api_create_task_failure(self):
        data = {
			"company": 1,
			"title":  "This is a task with no rule",
			"description":  "description",
        }
        self.response = self.client.post(
            reverse('tasks-list'),
            data,
            format="json"
        )
        self.assertEqual(self.response.status_code, status.HTTP_400_BAD_REQUEST)