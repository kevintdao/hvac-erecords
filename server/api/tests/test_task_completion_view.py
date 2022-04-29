from django.urls import reverse
from rest_framework import status
from django.test import TestCase
from records.models import TaskCompletion, ServiceVisit
from base.models import User, Company
from rest_framework.test import APIClient
import datetime
from rolepermissions.roles import assign_role

class TestTaskCompletionAPI(TestCase):
    fixtures = ['test_data.json', 'test_data_records.json']
    
    def setUp(self):
        self.user = User.objects.create(
            email="test@example.com",
            company = Company.objects.first()
        )
        assign_role(self.user, 'admin')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.initial_count = TaskCompletion.objects.count()
        self.service_visit = ServiceVisit.objects.get(pk=1)
        self.data = {
			"task": 1,
            "service_visit": 1,
            "completed_at": self.service_visit.start_time + datetime.timedelta(minutes=1),
            "response": "This is the technician response"
        }
        self.response = self.client.post(
            reverse('completions-list'),
            self.data,
            format="json"
        )

    def test_api_create_task_completion(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TaskCompletion.objects.count(), self.initial_count+1)
        self.assertEqual(TaskCompletion.objects.last().response, 'This is the technician response')

    def test_api_create_task_completion_failure(self):
        data = {
			"task": 1,
            "service_visit": 1,
            "completed_at": self.service_visit.start_time - datetime.timedelta(minutes=20),
            "response": "This is the technician response"
        }
        self.response = self.client.post(
            reverse('completions-list'),
            data,
            format="json"
        )
        self.assertEqual(self.response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_list_task_completions(self):
        url = reverse('completions-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(TaskCompletion.objects.count(), self.initial_count+1)

    def test_api_get_task_completion(self):
        task_completion = TaskCompletion.objects.last()
        response = self.client.get(
            reverse('completions-detail',
            kwargs={'pk':task_completion.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['response'], task_completion.response)

    def test_api_update_task_completion(self):
        task_completion = TaskCompletion.objects.last()
        new_data = {
			"task": 1,
            "service_visit": 1,
            "completed_at": self.service_visit.start_time + datetime.timedelta(minutes=1),
            "response": "This is a new technician response"
        }
        response = self.client.put(
            reverse('completions-detail',
            kwargs={'pk':task_completion.id}), data=new_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(TaskCompletion.objects.last().response, 'This is a new technician response') 

    def test_api_update_task_completion_failure(self):
        task_completion = TaskCompletion.objects.last()
        new_data = {
			"task": 1,
            "service_visit": 1,
            "completed_at": self.service_visit.end_time + datetime.timedelta(minutes=20),
            "response": "This is the technician response"
        }
        response = self.client.put(
            reverse('completions-detail',
            kwargs={'pk':task_completion.id}), data=new_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_delete_task_completion(self):
        task_completion = TaskCompletion.objects.last()
        response = self.client.delete(
            reverse('completions-detail',
            kwargs={'pk':task_completion.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(TaskCompletion.objects.count(), self.initial_count)

    def test_api_task_completion_not_found(self):
        response = self.client.get(
            reverse('completions-detail',
            kwargs={'pk':0}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
