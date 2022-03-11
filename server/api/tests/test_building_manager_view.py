from django.urls import reverse
from rest_framework import status
from django.test import TestCase
from base.models import BuildingManager, Company

class TestBuildingManagerAPI(TestCase):
    fixtures = ['test_data.json',]

    def setUp(self):
        self.data = {
            'company': 1,
            'name': 'Joe Smith',
            'phone_number': '512-513-5123'
        }
        self.response = self.client.post(
            reverse('managers-list'),
            self.data,
            format="json"
        )

    def test_api_create_building_manager(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(BuildingManager.objects.count(), 2)
        self.assertEqual(BuildingManager.objects.last().name, 'Joe Smith')

    def test_api_list_building_manager(self):
        url = reverse('managers-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(BuildingManager.objects.count(), 2)

    def test_api_get_building_manager(self):
        building_manager = BuildingManager.objects.last()
        response = self.client.get(
            reverse('managers-detail',
            kwargs={'pk':building_manager.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], building_manager.name)

    def test_api_update_building_manager(self):
        building_manager = BuildingManager.objects.last()
        new_data = {
            'company': 1,
            "name": "George Johnson",
            "phone_number": "512-513-0000",
        }
        response = self.client.put(
            reverse('managers-detail',
            kwargs={'pk':building_manager.id}), data=new_data, format="json", 
            content_type="application/json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(BuildingManager.objects.last().name, 'George Johnson') 

    def test_api_update_building_manager_failure(self):
        building_manager = BuildingManager.objects.last()
        new_data = {
            "first_name": "George",
        }
        response = self.client.put(
            reverse('managers-detail',
            kwargs={'pk':building_manager.id}), data=new_data, format="json", 
            content_type="application/json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_delete_building_manager(self):
        building_manager = BuildingManager.objects.last()
        response = self.client.delete(
            reverse('managers-detail',
            kwargs={'pk':building_manager.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(BuildingManager.objects.count(), 1)

    def test_api_building_manager_not_found(self):
        response = self.client.get(
            reverse('managers-detail',
            kwargs={'pk':0}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_api_create_building_manager_failure(self):
        data = {
            "first_name": "George",
        }
        self.response = self.client.post(
            reverse('managers-list'),
            data,
            format="json"
        )
        self.assertEqual(self.response.status_code, status.HTTP_400_BAD_REQUEST)