from django.urls import reverse
from rest_framework import status
from django.test import TestCase
from records.models import ServiceVisit, ProfilePlan
from base.models import Technician, User
from rest_framework.test import APIClient

class TestServiceVisitAPI(TestCase):
    fixtures = ['test_data.json', 'test_data_records.json']
    
    def setUp(self):
        self.user = User.objects.create(
            # username="test@example.com",
            email="test@example.com"
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.initial_count = ServiceVisit.objects.count()
        self.data = {
            "technician": 1,
            "unit": 1, 
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
            "unit": 1, 
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
            "unit": 1, 
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

    def test_api_get_service_visit(self):
        visit = ServiceVisit.objects.last()
        response = self.client.get(
            reverse('visits-detail',
            kwargs={'pk':visit.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['start_time'], "2022-03-20T17:41:28Z")

    def test_api_update_service_visit(self):
        visit = ServiceVisit.objects.last()
        new_data = {
            "technician": 1, 
            "unit": 1, 
            "plan": 1, 
            "start_time": "2022-03-20T17:41:28+00:00",
            "end_time": "2022-03-23T17:41:28+00:00"
        }
        response = self.client.put(
            reverse('visits-detail',
            kwargs={'pk':visit.id}), data=new_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(str(ServiceVisit.objects.last().end_time), "2022-03-23 17:41:28+00:00")
        self.assertEqual(ServiceVisit.objects.count(), self.initial_count+1)

    def test_api_update_service_visit_failure(self):
        visit = ServiceVisit.objects.last()
        new_data = {
            "technician": 1, 
            "unit": 1, 
            "plan": 1, 
            "start_time": "2022-03-20T17:41:28+00:00",
            "end_time": "2022-03-19T17:41:28+00:00"
        }
        response = self.client.put(
            reverse('visits-detail',
            kwargs={'pk':visit.id}), data=new_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_delete_profile_plan(self):
        visit = ServiceVisit.objects.last()
        response = self.client.delete(
            reverse('visits-detail',
            kwargs={'pk':visit.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(ServiceVisit.objects.count(), self.initial_count)


    def test_api_service_visit_not_found(self):
        response = self.client.get(
            reverse('visits-detail',
            kwargs={'pk':0}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)