from django.db import DataError
from django.test import TestCase

from base.models import Building, BuildingManager


class BuildingModelTests(TestCase):
    fixtures = [
        "test_data.json",
    ]

    def test_created_valid_building(self):
        Building.objects.create(
            manager=BuildingManager.objects.first(),
            site_name="Seamens Center",
            street="101 Main Street",
            city="Iowa City",
            zip_code="30142",
            country="United States",
        )
        self.assert_(Building.objects.filter(site_name="Seamens Center").exists())

    def test_created_invalid_building(self):
        with self.assertRaises(DataError):
            Building.objects.create(
                manager=BuildingManager.objects.first(),
                site_name="Seamens Center",
                street="101 Main Street",
                city="Iowa City",
                zip_code="3031231231323123212312142",
                country="United States",
            )
