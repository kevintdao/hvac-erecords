from re import T
from django.db import DataError
from django.test import TestCase
from server.base.models.technician import Technician

class BuildingManagerModelTests(TestCase):

    def test_created_valid_technician(self):
        Technician.objects.create(name='John Doe',phone_number='101-101-1010')
        self.assert_(Technician.objects.filter(name='John Doe',phone_number='101-101-1010').exists())

    def test_created_invalid_technician(self):
        with self.assertRaises(DataError):
            Technician.objects.create(name='John Doe',phone_number='101-101-1010 101-101-1010 101-101-1010')
