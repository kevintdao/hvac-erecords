from django.db import DataError
from django.test import TestCase

from base.models import Company, CompanyUser

class CompanyUserModelTests(TestCase):
    fixtures = ["test_data.json",]

    def test_created_valid_company_user(self):
        CompanyUser.objects.create(company=Company.objects.first(), name="Andrew Murley", phone_number="111-222-3333")
        self.assert_(CompanyUser.objects.filter(company=Company.objects.first(), name="Andrew Murley", phone_number="111-222-3333").exists())
    
    def test_created_invalid_company_user(self):
        with self.assertRaises(DataError):
            CompanyUser.objects.create(company=Company.objects.first(), name="Andrew Murley", phone_number="111-222-3333 111-222-3333 111-222-3333")
