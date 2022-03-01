from re import T
from django.db import DataError
from django.test import TestCase
from base.models import Technician

class BuildingManagerModelTests(TestCase):

    def test_created_valid_technician(self):
        Technician.objects.create(user_id = 5, company_id = 5, first_name = 'John', last_name = 'Doe', phone_number = '101-101-1010', license_number = 5)
        self.assert_(Technician.objects.filter(user_id = 5, company_id = 5, first_name = 'John', last_name = 'Doe', phone_number = '101-101-1010', license_number = 5).exists())

    def test_created_invalid_technician(self):
        with self.assertRaises(DataError):
            Technician.objects.create(user_id = 5, company_id = 5, first_name = 'John', last_name = 'Doe', phone_number = '101-101-1010 101-101-1010 101-101-1010 101-101-1010', license_number = 5)
