from django.urls import reverse
from rest_framework import status
from django.test import TestCase
from rest_framework.test import APIClient


class TestUnitRecordsAPI(TestCase):
    fixtures = ['test_data.json','test_data_records.json']
    
    def setUp(self):
        self.user = User.objects.create(
            username="test@example.com",
            email="test@example.com"
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)