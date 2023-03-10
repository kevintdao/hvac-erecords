from base.models import BuildingManager, Company, User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rolepermissions.checkers import has_role
from rolepermissions.roles import assign_role, clear_roles


class TestBuildingManagerAPI(TestCase):
    fixtures = [
        "test_data.json",
    ]

    def setUp(self):
        self.user = User.objects.create(
            email="test@example.com", company=Company.objects.first()
        )
        assign_role(self.user, "admin")
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.initial_count = BuildingManager.objects.count()
        self.data = {
            "name": "Joe Smith",
            "phone_number": "512-513-5123",
            "users": [
                {"email": "js@email.com"},
                {"email": "test@email.com"},
            ],
        }
        self.response = self.client.post(
            reverse("managers-list"), self.data, format="json"
        )

    def test_api_create_building_manager(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(BuildingManager.objects.count(), self.initial_count + 1)
        self.assertEqual(BuildingManager.objects.last().name, "Joe Smith")

    def test_api_list_building_manager(self):
        url = reverse("managers-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(BuildingManager.objects.count(), self.initial_count + 1)

    def test_api_get_building_manager(self):
        building_manager = BuildingManager.objects.last()
        response = self.client.get(
            reverse("managers-detail", kwargs={"pk": building_manager.id}),
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], building_manager.name)

    def test_api_update_building_manager(self):
        building_manager = BuildingManager.objects.last()
        new_data = {
            "name": "George Johnson",
            "phone_number": "512-513-0000",
        }
        response = self.client.put(
            reverse("managers-detail", kwargs={"pk": building_manager.id}),
            data=new_data,
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(BuildingManager.objects.last().name, "George Johnson")

    def test_api_update_building_manager_failure(self):
        building_manager = BuildingManager.objects.last()
        new_data = {
            "first_name": "George",
        }
        response = self.client.put(
            reverse("managers-detail", kwargs={"pk": building_manager.id}),
            data=new_data,
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_building_manager_role(self):
        manager = BuildingManager.objects.last()
        user = manager.users.first()
        self.assert_(has_role(user, "manager"))

    def test_building_manager_company(self):
        manager = BuildingManager.objects.last()
        user = manager.users.first()
        self.assertEqual(user.company, Company.objects.first())

    def test_api_delete_building_manager(self):
        building_manager = BuildingManager.objects.last()
        response = self.client.delete(
            reverse("managers-detail", kwargs={"pk": building_manager.id}),
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(BuildingManager.objects.count(), self.initial_count)

    def test_api_building_manager_not_found(self):
        response = self.client.get(
            reverse("managers-detail", kwargs={"pk": 0}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_api_create_building_manager_failure(self):
        data = {
            "first_name": "George",
        }
        self.response = self.client.post(reverse("managers-list"), data, format="json")
        self.assertEqual(self.response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_building_manager_noperm(self):
        clear_roles(self.user)
        url = reverse("managers-list")
        self.response = self.client.get(url)
        self.assertEqual(self.response.status_code, status.HTTP_401_UNAUTHORIZED)
        building_manager = BuildingManager.objects.last()
        self.response = self.client.get(
            reverse("managers-detail", kwargs={"pk": building_manager.id}),
            format="json",
        )
        self.assertEqual(self.response.status_code, status.HTTP_404_NOT_FOUND)
