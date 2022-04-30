import datetime

from base.models import Company, Unit, User, Building, BuildingManager, Technician
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rolepermissions.roles import assign_role, clear_roles


class TestFilteringAPI(TestCase):
    fixtures = ['test_data_filtering.json']

    def setUp(self):
        self.user_company = User.objects.get(pk=1)
        assign_role(self.user_company, 'company')

        self.user_manager = User.objects.get(pk=2)
        assign_role(self.user_manager, 'manager')

        self.company = Company.objects.get(pk=1)

        self.client = APIClient()


    def test_api_filter_technician_as_company(self):
        self.client.force_authenticate(user=self.user_company)
        technicians = Technician.objects.filter(company=self.company)
        response = self.client.get(reverse('technicians-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for technician in response.data:
            self.assert_(technicians.filter(pk=technician['user']).exists())
        
        technician_related = technicians.first()
        response = self.client.get(
            reverse('technicians-detail',
            kwargs={'pk':technician_related.user_id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        technician_not_related = Technician.objects.exclude(company=self.company).first()
        response = self.client.get(
            reverse('technicians-detail',
            kwargs={'pk':technician_not_related.user_id}), format="json"
        )
        self.assertNotEqual(response.status_code, status.HTTP_200_OK)


    def test_api_filter_building_manager_as_company(self):
        self.client.force_authenticate(user=self.user_company)
        managers = BuildingManager.objects.filter(company=self.company)
        response = self.client.get(reverse('managers-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for manager in response.data:
            self.assert_(managers.filter(pk=manager['id']).exists())
        
        manager_related = managers.first()
        response = self.client.get(
            reverse('managers-detail',
            kwargs={'pk':manager_related.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        manager_not_related = BuildingManager.objects.exclude(company=self.company).first()
        response = self.client.get(
            reverse('managers-detail',
            kwargs={'pk':manager_not_related.id}), format="json"
        )
        self.assertNotEqual(response.status_code, status.HTTP_200_OK)

    def test_api_filter_building_manager_as_company(self):
        self.client.force_authenticate(user=self.user_company)
        managers = BuildingManager.objects.filter(company=self.company)
        response = self.client.get(reverse('managers-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for manager in response.data:
            self.assert_(managers.filter(pk=manager['id']).exists())
        
        manager_related = managers.first()
        response = self.client.get(
            reverse('managers-detail',
            kwargs={'pk':manager_related.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        manager_not_related = BuildingManager.objects.exclude(company=self.company).first()
        response = self.client.get(
            reverse('managers-detail',
            kwargs={'pk':manager_not_related.id}), format="json"
        )
        self.assertNotEqual(response.status_code, status.HTTP_200_OK)


    def test_api_filter_building_as_company(self):
        self.client.force_authenticate(user=self.user_company)
        managers = BuildingManager.objects.filter(company=self.company)
        buildings = Building.objects.filter(manager__in=managers)

        response = self.client.get(reverse('buildings-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for building in response.data:
            self.assert_(managers.filter(pk=building['manager']).exists())
        
        building_related = buildings.first()
        response = self.client.get(
            reverse('buildings-detail',
            kwargs={'pk':building_related.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        building_not_related = Building.objects.exclude(manager__in=managers).first()
        response = self.client.get(
            reverse('buildings-detail',
            kwargs={'pk':building_not_related.id}), format="json"
        )
        self.assertNotEqual(response.status_code, status.HTTP_200_OK)

    def test_api_filter_unit_as_company(self):
        self.client.force_authenticate(user=self.user_company)
        managers = BuildingManager.objects.filter(company=self.company)
        buildings = Building.objects.filter(manager__in=managers)
        units = Unit.objects.filter(building__in=buildings)

        response = self.client.get(reverse('units-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for unit in response.data:
            self.assert_(buildings.filter(pk=unit['building']).exists())
        
        unit_related = units.first()
        response = self.client.get(
            reverse('units-detail',
            kwargs={'pk':unit_related.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        unit_not_related = Unit.objects.exclude(building__in=buildings).first()
        response = self.client.get(
            reverse('units-detail',
            kwargs={'pk':unit_not_related.id}), format="json"
        )
        self.assertNotEqual(response.status_code, status.HTTP_200_OK)
