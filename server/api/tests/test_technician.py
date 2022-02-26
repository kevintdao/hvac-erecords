from django.urls import reverse
from rest_framework import status
from django.test import TestCase
from base.models import Technician

class TestTechnician(TestCase):
    def setUp(self):
        self.data = {
            'name': "John Doe",
            'technician_id': '001',
            'phone_number': '101-101-1010'
        }
        self.response = self.client.post(
            reverse('technicians-list'),
            self.data,
            format="json"
        )

    def test_api_create_technician(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Technician.objects.count(), 1)
        self.assertEqual(Technician.objects.get().name, "John Doe")
    
    def test_api_create_technician_failure(self):
        data = {
            'id': '002',
        }
        self.response = self.client.post(
            reverse('technicians-list'),
            data,
            format="json"
        )
        self.assertEqual(self.response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_list_technician(self):
        url = reverse('technicians-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Technician.objects.count(), 1)

    def test_api_get_technician(self):
        technician = Technician.objects.get()
        response = self.client.get(
            reverse('technicians-detail',
            kwargs={'pk':technician.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], technician.name)

    def test_api_technician_not_found(self):
        response = self.client.get(
            reverse('technicians-detail',
            kwargs={'pk':0}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
