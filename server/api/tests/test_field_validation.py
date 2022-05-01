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

    def test_api_building_bad_manager_update(self):
        self.client.force_authenticate(user=self.user_company)
        manager_not_related = BuildingManager.objects.exclude(company=self.company).first()

        building = Building.objects.first()
        new_data = {
            'manager': manager_not_related.id,
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
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_unit_bad_building(self):
        self.client.force_authenticate(user=self.user_company)
        managers = BuildingManager.objects.filter(company=self.company)
        building_not_related = Building.objects.exclude(manager__in=managers).first()

        data = {
            'building': building_not_related.id,
            'external_id': '',
            'category': 'AC',
            'serial_number': '24ABC542W003102',
            'model_number': '1234A00',
            'manufacturer': 'Trane',
            'production_date': datetime.date(2015,10,20),
            'installation_date': datetime.date(2016,1,1)
        }
        response = self.client.post(
            reverse('units-list'),
            data,
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_task_bad_company_update(self):
        self.client.force_authenticate(user=self.user_company)
        task = Task.objects.for_user(self.user_company).first()
        company_not_related = Company.objects.exclude(pk=self.company.id).first()

        self.assertEqual(task.company, self.company)
        new_data = {
			"company": company_not_related.id,
			"title":  "Unit in good condition",
			"description":  "choose if the condition is in a satisfactory condition",
            "rule":  '{	"type": "1", "name": "response" }'
        }
        response = self.client.put(
            reverse('tasks-detail',
            kwargs={'pk':task.id}), data=new_data, format="json"
        )
        self.assertNotEqual(task.company, company_not_related)
        self.assertEqual(task.company, self.company)
        self.assertEqual(response.status_code, status.HTTP_200_OK)