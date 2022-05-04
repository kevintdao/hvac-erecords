from base.models import User, Company, Unit
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rolepermissions.roles import assign_role, clear_roles


class TestRefrigerantReportAPI(TestCase):
    fixtures = ['test_data.json','epa608.json']

    def setUp(self):
        self.user = User.objects.create(
            email="test@example.com",
            company = Company.objects.first()
        )
        assign_role(self.user, 'admin')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_api_get_refrigerant_report(self):
        unit = Unit.objects.last()
        response = self.client.get(
            reverse('units-refrigerant',
            kwargs={'pk':unit.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_refrigerant_report_noperm(self):
        clear_roles(self.user)
        unit = Unit.objects.last()
        self.response = self.client.get(
            reverse('units-refrigerant',
            kwargs={'pk':unit.id}), format="json"
        )
        self.assertEqual(self.response.status_code, status.HTTP_404_NOT_FOUND)

