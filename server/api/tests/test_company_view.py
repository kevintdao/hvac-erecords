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
            'country': 'Country',
            'phone_number': '010-101-0101'
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
