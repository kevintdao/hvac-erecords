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

    def test_api_list_tasks(self):
        url = reverse('tasks-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Task.objects.count(), 2)

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

    def test_api_get_task(self):
        task = Task.objects.last()
        response = self.client.get(
            reverse('tasks-detail',
            kwargs={'pk':task.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], task.title)

    def test_api_update_task(self):
        task = Task.objects.last()
        new_data = {
			"company": 1,
			"title":  "Unit in good condition",
			"description":  "choose the appropriate option",
            "rule":  '{"name": "selection", "options": {"1": "Yes", "2": "No"}}}'
        }
        response = self.client.put(
            reverse('tasks-detail',
            kwargs={'pk':task.id}), data=new_data, format="json", 
            content_type="application/json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Task.objects.last().description, 'choose the appropriate option') 

    def test_api_update_task_failure(self):
        task = Task.objects.last()
        new_data = {
			"company": 900,
			"title":  "Unit in good condition",
			"description":  "choose the appropriate option",
            "rule":  '{"name": "selection", "options": {"1": "Yes", "2": "No"}}}'
        }
        response = self.client.put(
            reverse('tasks-detail',
            kwargs={'pk':task.id}), data=new_data, format="json", 
            content_type="application/json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_delete_task(self):
        task = Task.objects.last()
        response = self.client.delete(
            reverse('tasks-detail',
            kwargs={'pk':task.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Task.objects.count(), 1)

    
    def test_api_task_not_found(self):
        response = self.client.get(
            reverse('tasks-detail',
            kwargs={'pk':0}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)