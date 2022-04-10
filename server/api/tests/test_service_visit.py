from django.urls import reverse
from rest_framework import status
from django.test import TestCase
from records.models import ServiceVisit, ProfilePlan
from base.models import Technician
from django.utils import timezone
import datetime

class TestServiceVisitAPI(TestCase):
    fixtures = ['test_data.json', 'test_data_records.json']
    
    def setUp(self):
        self.initial_count = ServiceVisit.objects.count()
        self.data = {
            "technician": 1, 
            "plan": 1, 
            "start_time": "2022-03-20T17:41:28+00:00",
            "end_time": "2022-03-22T17:41:28+00:00"
        }
        self.response = self.client.post(
            reverse('visits-list'),
            self.data,
            format="json"
        )

    def test_api_create_service_visit(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ServiceVisit.objects.count(), self.initial_count+1)
        self.assertEqual(ServiceVisit.objects.last().technician, Technician.objects.get(pk=1))
        self.assertEqual(ServiceVisit.objects.last().plan, ProfilePlan.objects.get(pk=1))

    def test_api_create_service_visit_failure(self):
        data = {
            "technician": 1, 
            "plan": 1, 
            "end_time": "2022-03-22T17:41:28+00:00",
        }
        self.response = self.client.post(
            reverse('visits-list'),
            data,
            format="json"
        )
        self.assertEqual(self.response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_create_service_visit_failure_start_after_end(self):
        data = {
            "technician": 1, 
            "plan": 1, 
            "start_time": "2022-03-29T17:41:28+00:00",
            "end_time": "2022-03-22T17:41:28+00:00",
        }
        self.response = self.client.post(
            reverse('visits-list'),
            data,
            format="json"
        )
        self.assertEqual(self.response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_list_service_visits(self):
        url = reverse('visits-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(ServiceVisit.objects.count(), self.initial_count+1)