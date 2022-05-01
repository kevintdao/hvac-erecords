from base.models import CompanyUser, Company, User
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rolepermissions.roles import assign_role

class TestCompanyUserAPI(TestCase):
    fixtures = ['test_data.json',]

    def setUp(self):
        self.user = User.objects.create(
            email="test@example.com",
            company = Company.objects.first()
        )
        assign_role(self.user, 'company')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.initial_count = CompanyUser.objects.count()
        self.data = {
            "company": 1,
            "users": [
	            {"email": "am@email.com",
                "password": "ampass"},
	        ]
        }
        self.response = self.client.post(
            reverse('company-users-list'),
            self.data,
            format="json"
        )
