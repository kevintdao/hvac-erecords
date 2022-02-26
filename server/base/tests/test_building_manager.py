from django.db import DataError
from django.test import TestCase

from base.models import BuildingManager

class BuildingManagerModelTests(TestCase):

    def test_created_valid_building_manager(self):
        BuildingManager.objects.create(name="John Smith",phone_number="555-555-8080")
        self.assert_(BuildingManager.objects.filter(name = "John Smith", phone_number = '555-555-8080').exists())

    def test_created_invalid_building_manager(self):
        with self.assertRaises(DataError):
            BuildingManager.objects.create(name="John Smith",phone_number="555-555-8080 555-555-8080 555-555-8080 555-555-8080")