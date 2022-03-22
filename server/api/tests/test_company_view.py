from django.urls import reverse
from rest_framework import status
from django.test import TestCase
from base.models import Technician, Company

class TestMaintenanceCompanyAPI(TestCase):
    def setUp(self):
        self.data = {
            'name': 'Example',
            'street': '1234 Street Rd',
            'city': 'City',
            'zip_code': '12345',
            'country': 'Country'
        }
        self.response = self.client.post(
            reverse('companies-list'),
            self.data,
            format="json"
        )
    
    def test_api_create_company(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Company.objects.count(), 1)
        self.assertEqual(Company.objects.get().name, 'Example')
    
    def test_company_technicians_list(self):
        data = {
            {
                'user_id' : 1,
                'company_id' : 1,
                'first_name' : 'John',
                'last_name' : 'Doe',
                'phone_number' : '101-101-1010',
                'license_number' : 1
            },
            {
                'user_id' : 2,
                'company_id' : 1,
                'first_name' : 'John',
                'last_name' : 'Riley',
                'phone_number' : '100-101-1010',
                'license_number' : 2
            },
            {
                'user_id' : 3,
                'company_id' : 2,
                'first_name' : 'Ben',
                'last_name' : 'Thomas',
                'phone_number' : '101-101-1010',
                'license_number' : 3
            }
        }
        self.response = self.client.post(
            reverse('technicians-list'),
            data,
            format="json"
        )
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Technician.objects.count(), 3)

        technician = Technician.objects.get()
        response = self.client.get(
            reverse('technicians-detail',
            kwargs={'pk':technician.company_id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.count(), 2)
