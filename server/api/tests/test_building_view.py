from base.models import Building, Company, User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rolepermissions.roles import assign_role, clear_roles


class TestBuildingAPI(TestCase):
    fixtures = ['test_data.json',]

    def setUp(self):
        self.user = User.objects.create(
            email="test@example.com",
            company = Company.objects.first()
        )
        assign_role(self.user, 'admin')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.initial_count = Building.objects.count()
        self.data = {
            'manager': 1,
            'site_name' : 'Seamans Center',
            'street' : '103 South Capitol Strreet',
            'city' : 'Iowa City',
            'state' : 'Iowa',
            'zip_code' : '52240',
            'country' : 'United States'
        }
        self.response = self.client.post(
            reverse('buildings-list'),
            self.data,
            format="json"
        )

    def test_api_create_building(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Building.objects.count(), self.initial_count+1)
        self.assertEqual(Building.objects.last().site_name, 'Seamans Center')

    def test_api_list_building(self):
        url = reverse('buildings-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Building.objects.count(), self.initial_count+1)

    def test_api_get_building(self):
        building = Building.objects.last()
        response = self.client.get(
            reverse('buildings-detail',
            kwargs={'pk':building.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['zip_code'], building.zip_code)

    def test_api_update_building(self):
        building = Building.objects.last()
        new_data = {
            'manager': 1,
            'site_name' : 'Seamans Center',
            'street' : '103 South Capitol Strreet',
            'city' : 'Iowa City',
            'state' : 'Iowa',
            'zip_code' : '52241',
            'country' : 'United States'
        }
        response = self.client.put(
            reverse('buildings-detail',
            kwargs={'pk':building.id}), data=new_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Building.objects.last().zip_code, '52241') 

    def test_api_update_building_failure(self):
        building = Building.objects.last()
        new_data = {
            "zip_code": "faef32fa3f3rt3gaw23ga3w32",
        }
        response = self.client.put(
            reverse('buildings-detail',
            kwargs={'pk':building.id}), data=new_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_delete_building(self):
        building = Building.objects.last()
        response = self.client.delete(
            reverse('buildings-detail',
            kwargs={'pk':building.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Building.objects.count(), self.initial_count)

    def test_api_building_not_found(self):
        response = self.client.get(
            reverse('buildings-detail',
            kwargs={'pk':0}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_api_create_building_failure(self):
        data = {
            "zip_code": "f32f3af32f2aq3f2a3f23rt2a3f3",
        }
        self.response = self.client.post(
            reverse('buildings-list'),
            data,
            format="json"
        )
        self.assertEqual(self.response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_building_noperm(self):
        clear_roles(self.user)
        url = reverse('buildings-list')
        self.response = self.client.get(url)
        self.assertEqual(self.response.status_code, status.HTTP_401_UNAUTHORIZED)
        building = Building.objects.last()
        self.response = self.client.get(
            reverse('buildings-detail',
            kwargs={'pk':building.id}), format="json"
        )
        self.assertEqual(self.response.status_code, status.HTTP_401_UNAUTHORIZED)