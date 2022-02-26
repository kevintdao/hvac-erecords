from django.urls import reverse
from rest_framework import status
from django.test import TestCase
from base.models import Unit
import datetime

class TestUnitAPI(TestCase):
    def setUp(self):
        self.data = {
            'external_id': '',
            'category': 'AC',
            'serial_number': '24ABC542W003102',
            'model_number': '1234A00',
            'manufacturer': 'Trane',
            'production_date': datetime.date(2015,10,20),
            'installation_date': datetime.date(2016,1,1),
        }
        self.response = self.client.post(
            reverse('units-list'),
            self.data,
            format="json"
        )

    def test_api_create_unit(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Unit.objects.count(), 1)
        self.assertEqual(Unit.objects.get().manufacturer, 'Trane')

    def test_api_list_unit(self):
        url = reverse('units-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Unit.objects.count(), 1)

    def test_api_get_unit(self):
        unit = Unit.objects.get()
        response = self.client.get(
            reverse('units-detail',
            kwargs={'pk':unit.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['manufacturer'], unit.manufacturer)

    def test_api_update_unit(self):
        unit = Unit.objects.get()
        new_data = {
            'category': 'AC',
            'serial_number': '24ABC542W003102',
            'model_number': '1234A00',
            'manufacturer': 'Trane',
            'production_date': datetime.date(2015,10,21),
            'installation_date': datetime.date(2016,1,1),
        }
        response = self.client.put(
            reverse('units-detail',
            kwargs={'pk':unit.id}), data=new_data, format="json", 
            content_type="application/json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Unit.objects.get().production_date, datetime.date(2015,10,21)) 

    def test_api_update_unit_failure(self):
        unit = Unit.objects.get()
        new_data = {
            'serialnumber': '0123',
        }
        response = self.client.put(
            reverse('units-detail',
            kwargs={'pk':unit.id}), data=new_data, format="json", 
            content_type="application/json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_delete_unit(self):
        unit = Unit.objects.get()
        response = self.client.delete(
            reverse('units-detail',
            kwargs={'pk':unit.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Unit.objects.count(), 0)

    def test_api_unit_not_found(self):
        response = self.client.get(
            reverse('units-detail',
            kwargs={'pk':0}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_api_create_unit_failure(self):
        data = {
            "serialnumber": "0123",
        }
        self.response = self.client.post(
            reverse('units-list'),
            data,
            format="json"
        )
        self.assertEqual(self.response.status_code, status.HTTP_400_BAD_REQUEST)
