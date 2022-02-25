from django.urls import reverse
from rest_framework import status
from django.test import TestCase
from base.models import BuildingManager

class TestBuildingManagerAPI(TestCase):
    def setUp(self):
        print(reverse('managers-add'))
        self.data = {
            'name': 'Joe Smith',
            'phone_number': '512-513-5123'
        }
        self.response = self.client.post(
            reverse('managers-add'),
            self.data,
            format="json"
        )

    def test_api_create_building_manager(self):
        self.assertEqual(BuildingManager.objects.count(), 1)
        self.assertEqual(BuildingManager.objects.get().name, 'Joe Smith')

    def test_api_list_building_manager(self):
        url = reverse('managers-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(BuildingManager.objects.count(), 1)

    def test_api_get_building_manager(self):
        building_manager = BuildingManager.objects.get()
        response = self.client.get(
            reverse('managers-detail',
            kwargs={'pk':building_manager.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response,building_manager)
