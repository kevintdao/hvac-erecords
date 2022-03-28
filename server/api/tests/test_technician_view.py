from django.urls import reverse
from rest_framework import status
from django.test import TestCase
from base.models import Technician, Company

class TestTechnicianAPI(TestCase):
    fixtures = ['test_data.json',]

    def setUp(self):
        self.data = {
            'company' : 1,
            'first_name' : 'John',
            'last_name' : 'Doe',
            'phone_number' : '101-101-1010',
            'license_number' : 5
        }
        self.response = self.client.post(
            reverse('technicians-list'),
            self.data,
            format="json"
        )

    def test_api_create_technician(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Technician.objects.count(), 2)
        self.assertEqual(Technician.objects.last().first_name, 'John')
    
    def test_api_create_technician_failure(self):
        data = {
            'id': '2',
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
        self.assertEqual(Technician.objects.count(), 2)

    def test_api_get_technician(self):
        technician = Technician.objects.last()
        response = self.client.get(
            reverse('technicians-detail',
            kwargs={'pk':technician.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['first_name'], technician.first_name)

    def test_api_technician_not_found(self):
        response = self.client.get(
            reverse('technicians-detail',
            kwargs={'pk':0}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_api_update_technician(self):
        technician = Technician.objects.last()
        new_data = {
            'company' : 1,
            'first_name' : 'Andrew',
            'last_name' : 'Murley',
            'phone_number' : '010-010-0101',
            'license_number' : 2
        }
        response = self.client.put(
            reverse('technicians-detail',
            kwargs={'pk':technician.id}), data=new_data, format="json",
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Technician.objects.last().first_name, 'Andrew')

    def test_api_update_technician_failure(self):
        technician = Technician.objects.last()
        new_data = {
            'id': '2',
        }
        response = self.client.put(
            reverse('technicians-detail',
            kwargs={'pk':technician.id}), data=new_data, format="json",
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_delete_technician(self):
        technician = Technician.objects.last()
        response = self.client.delete(
            reverse('technicians-detail',
            kwargs={'pk':technician.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Technician.objects.count(), 1)