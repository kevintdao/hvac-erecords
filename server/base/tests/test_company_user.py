from django.db import DataError
from django.test import TestCase

from base.models import Company, CompanyUser

class CompanyUserModelTests(TestCase):
    fixtures = ["test_data.json",]

    def test_created_valid_company_user(self):
        CompanyUser.objects.create(company=Company.objects.first())
        self.assert_(CompanyUser.objects.filter(company=Company.objects.first()).exists())

