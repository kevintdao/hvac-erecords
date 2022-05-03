from base.models import CompanyUser, Company, User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rolepermissions.checkers import has_role
from rolepermissions.roles import assign_role, clear_roles

class TestCompanyUserAPI(TestCase):
    fixtures = ['test_data.json',]

    def setUp(self):
        self.user = User.objects.create(
            email="test@example.com",
            company = Company.objects.first()
        )
        assign_role(self.user, 'company')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.initial_count = CompanyUser.objects.count()
        self.data = {
            "company": 1,
            "users": [
	            {"email": "am@email.com",
                "password": "ampass"},
	        ]
        }
        self.response = self.client.post(
            reverse('company-users-list'),
            self.data,
            format="json"
        )
    def test_api_create_company_user(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(CompanyUser.objects.count(), self.initial_count+1)
    
    def test_api_list_company_user(self):
        url = reverse('company-users-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(CompanyUser.objects.count(), self.initial_count+1)
    
    def test_api_get_company_user(self):
        company_user = CompanyUser.objects.last()
        response = self.client.get(
            reverse('company-users-detail',
            kwargs={'pk':company_user.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_api_update_company_user(self):
        company_user = CompanyUser.objects.last()
        new_data = {
            "company": 1,
            "users": [
	            {"email": "am2@email.com",
                "password": "ampass2"},
	        ]
        }
        response = self.client.put(
            reverse('company-users-detail',
            kwargs={'pk':company_user.id}), data=new_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_api_update_company_user_failure(self):
        company_user = CompanyUser.objects.last()
        new_data = {
            "user": "Andrew",
        }
        response = self.client.put(
            reverse('company-users-detail',
            kwargs={'pk':company_user.id}), data=new_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_company_user_role(self):
        company_user = CompanyUser.objects.last()
        user = company_user.users.first()
        self.assert_(has_role(user, 'company'))

    def test_company_user_company(self):
        company_user = CompanyUser.objects.last()
        user = company_user.users.first()
        self.assertEqual(user.company, Company.objects.first())

    def test_api_delete_company_user(self):
        company_user = CompanyUser.objects.last()
        response = self.client.delete(
            reverse('company-users-detail',
            kwargs={'pk':company_user.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(CompanyUser.objects.count(), self.initial_count)

    def test_api_company_user_not_found(self):
        response = self.client.get(
            reverse('company-users-detail',
            kwargs={'pk':0}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_api_create_company_user_failure(self):
        data = {
            "name": "Andrew",
        }
        self.response = self.client.post(
            reverse('company-users-list'),
            data,
            format="json"
        )
        self.assertEqual(self.response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_company_user_noperm(self):
        clear_roles(self.user)
        url = reverse('company-users-list')
        self.response = self.client.get(url)
        self.assertEqual(self.response.status_code, status.HTTP_401_UNAUTHORIZED)
        company_user = CompanyUser.objects.last()
        self.response = self.client.get(
            reverse('company-users-detail',
            kwargs={'pk':company_user.id}), format="json"
        )
        self.assertEqual(self.response.status_code, status.HTTP_404_NOT_FOUND)
