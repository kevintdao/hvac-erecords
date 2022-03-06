from re import T
from django.db import DataError
from django.test import TestCase
from base.models import Company

class CompanyModelTests(TestCase):

    def test_created_valid_company(self):
        Company.objects.create(name='Example', street='1234 Street Rd', city='City', zip_code='12345', country='Country')
        self.assert_(Company.objects.filter(name='Example', street='1234 Street Rd', city='City', zip_code='12345', country='Country').exists())
    
    def test_created_invalid_company(self):
        with self.assertRaises(DataError):
            Company.objects.create(name='Example', street='1234 Street Rd', city='City', zip_code='12345678910', country='Country')