from hashlib import new
from base.models import Company, Technician, User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rolepermissions.checkers import has_role
from rolepermissions.roles import assign_role, clear_roles


class TestTechnicianAPI(TestCase):
    fixtures = ['test_data.json',]

    def setUp(self):
        self.user = User.objects.create(
            email="test@example.com",
            company = Company.objects.first()
        )
        assign_role(self.user, 'admin')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.initial_count = Technician.objects.count()
        self.data = {
            'user' : {'email': 'test@testmail.com'},
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
        self.assertEqual(Technician.objects.count(), self.initial_count+1)
        self.assertEqual(Technician.objects.last().first_name, 'John')

    def test_api_create_technician_failure(self):
        data = {
            'email': '33@test.com',
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
        self.assertEqual(Technician.objects.count(), self.initial_count+1)

    def test_api_get_technician(self):
        technician = Technician.objects.last()
        response = self.client.get(
            reverse('technicians-detail',
            kwargs={'pk':technician.user_id}), format="json"
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
            'first_name' : 'Andrew',
            'last_name' : 'Doe',
            'phone_number' : '101-101-1010',
            'license_number' : 5
        }
        response = self.client.put(
            reverse('technicians-detail',
            kwargs={'pk':technician.user_id}), data=new_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Technician.objects.last().first_name, 'Andrew')

    def test_api_update_technician_failure(self):
        technician = Technician.objects.last()
        new_data = {
            'user': '2',
        }
        response = self.client.put(
            reverse('technicians-detail',
            kwargs={'pk':technician.user_id}), data=new_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_technician_role(self):
        technician = Technician.objects.last()
        user = User.objects.get(pk=technician.user_id)
        self.assert_(has_role(user, 'technician'))

    def test_technician_company(self):
        technician = Technician.objects.last()
        user = technician.user
        self.assertEqual(user.company, Company.objects.first())

    def test_api_delete_technician(self):
        technician = Technician.objects.last()
        response = self.client.delete(
            reverse('technicians-detail',
            kwargs={'pk':technician.user_id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Technician.objects.count(), self.initial_count)

    def test_api_technician_noperm(self):
        clear_roles(self.user)
        url = reverse('technicians-list')
        self.response = self.client.get(url)
        self.assertEqual(self.response.status_code, status.HTTP_401_UNAUTHORIZED)
        technician = Technician.objects.last()
        self.response = self.client.get(
            reverse('technicians-detail',
            kwargs={'pk':technician.user_id}), format="json"
        )
        self.assertEqual(self.response.status_code, status.HTTP_404_NOT_FOUND)
