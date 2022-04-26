from django.urls import reverse
from rest_framework import status
from django.test import TestCase
from base.models import Unit, User, Company
from rest_framework.test import APIClient


class TestUnitRecordsAPI(TestCase):
    fixtures = ['test_data.json','test_data_records.json']
    
    def setUp(self):
        self.user = User.objects.create(
            email="test@example.com",
            company = Company.objects.first()
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_api_get_unit_records(self):
        unit = Unit.objects.last()
        response = self.client.get(
            reverse('units-records',
            kwargs={'pk':unit.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)