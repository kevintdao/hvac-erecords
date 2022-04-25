from django.urls import reverse
from rest_framework import status
from django.test import TestCase
from base.models import Company, User
from rest_framework.test import APIClient

class TestMaintenanceCompanyAPI(TestCase):
    fixtures = ['test_data.json',]

    def setUp(self):
        self.user = User.objects.create(
            # username="test@example.com",
            email="test@example.com"
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.data = {
            "name": "University of Iowa",
            "street": "123 Street",
            "city": "Iowa City",
            "zip_code": "52240",
            "country": "United States",
            "phone_number": "100-100-1000"
        }
        self.response = self.client.post(
            reverse('companies-list'),
            self.data,
            format="json"
        )
    
    def test_api_create_company(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Company.objects.count(), 2)
        self.assertEqual(Company.objects.last().name, 'University of Iowa')
    
    def test_api_list_company(self):
        url = reverse('companies-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Company.objects.count(), 2)
    
    def test_api_get_company(self):
        company = Company.objects.last()
        response = self.client.get(
            reverse('companies-detail',
            kwargs={'pk':company.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['zip_code'], company.zip_code)
    
    def test_api_update_company(self):
        company = Company.objects.last()
        new_data = {
            "name": "University of Iowa",
            "street": "456 Road",
            "city": "Iowa City",
            "zip_code": "52245",
            "country": "United States",
            "phone_number": "100-100-1000"
        }
        response = self.client.put(
            reverse('companies-detail',
            kwargs={'pk':company.id}), data=new_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Company.objects.last().zip_code, '52245')
    
    def test_api_update_company_failure(self):
        company = Company.objects.last()
        new_data = {
            "zip_code": "thisisoversixteencharacters",
        }
        response = self.client.put(
            reverse('companies-detail',
            kwargs={'pk':company.id}), data=new_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_api_delete_company(self):
        company = Company.objects.last()
        response = self.client.delete(
            reverse('companies-detail',
            kwargs={'pk':company.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Company.objects.count(), 1)
    
    def test_api_company_not_found(self):
        response = self.client.get(
            reverse('companies-detail',
            kwargs={'pk':0}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    
    def test_api_create_company_failure(self):
        data = {
            "zip_code": "thisisoversixteencharacters",
        }
        self.response = self.client.post(
            reverse('companies-list'),
            data,
            format="json"
        )
        self.assertEqual(self.response.status_code, status.HTTP_400_BAD_REQUEST)
