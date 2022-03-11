from django.db import DataError
from django.test import TestCase

from base.models import Company

class CompanyModelTests(TestCase):

    def test_created_valid_company(self):
        Company.objects.create(name="HVAC Company #1", street="101 Main Street", city="Iowa City", zip_code="30142", country="United States", phone_number="555-555-5555")
        self.assert_(Company.objects.filter(name="HVAC Company #1").exists())

    def test_created_invalid_company(self):
        with self.assertRaises(DataError):
            Company.objects.create(name="HVAC Company #1", street="101 Main Street", city="Iowa City", zip_code="30142312312312312312321321321321321", country="United States", phone_number="555-555-5555")

