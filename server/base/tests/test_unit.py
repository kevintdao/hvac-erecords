from django.db import DataError
from django.test import TestCase

from base.models import Unit
from base.models import Building

import datetime

class UnitModelTests(TestCase):
    fixtures = ['buildings.json',] 

    def test_created_valid_unit(self):
        Unit.objects.create(external_id="",building=Building.objects.first(),category="AC",serial_number="24ABC542W003102",model_number="1234A00",manufacturer="Trane",production_date=datetime.date(2015,10,20))
        self.assert_(Unit.objects.filter(serial_number = "24ABC542W003102", manufacturer = 'Trane').exists())

    def test_created_invalid_unit(self):
        with self.assertRaises(DataError):
            Unit.objects.create(serial_number='1'*256)