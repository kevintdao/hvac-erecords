import datetime

from base.models import Company, Unit, User, Building, BuildingManager, Technician
from records.models import ServiceVisit, Task, Profile, ProfileTask, ProfilePlan, TaskCompletion
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rolepermissions.roles import assign_role, clear_roles


class TestFilteringAPI(TestCase):
    fixtures = ['test_data_filtering.json', 'test_data_records_filtering.json']

    def setUp(self):
        self.user_company = User.objects.get(pk=1)
        assign_role(self.user_company, 'company')

        self.user_manager = User.objects.get(pk=2)
        assign_role(self.user_manager, 'manager')

        self.company = Company.objects.get(pk=1)

        self.manager = BuildingManager.objects.filter(users=self.user_manager).first()

        self.client = APIClient()

    def test_api_building_bad_manager(self):
        self.client.force_authenticate(user=self.user_company)
        manager_not_related = BuildingManager.objects.exclude(company=self.company).first()

        data = {
            'manager': manager_not_related.id,
            'site_name' : 'Seamans Center',
            'street' : '103 South Capitol Strreet',
            'city' : 'Iowa City',
            'state' : 'Iowa',
            'zip_code' : '52240',
            'country' : 'United States'
        }
        response = self.client.post(
            reverse('buildings-list'),
            data,
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
