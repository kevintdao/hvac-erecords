from django.test import TestCase
from base.models import Technician, Company, User

# from django.contrib.auth.models import User
from rolepermissions.roles import assign_role
from rolepermissions.checkers import has_role


class UserModelRoleTests(TestCase):
    fixtures = [
        "test_data.json",
    ]

    def test_created_valid_user(self):
        user = User.objects.create(
            email="test@test.com", company=Company.objects.first()
        )
        self.assert_(User.objects.filter(email="test@test.com").exists())
        assign_role(user, "admin")
        self.assert_(has_role(user, "admin") == True)
        self.assert_(has_role(user, "technician") == False)

    def test_created_valid_technician_user(self):
        technician = Technician.objects.create(
            company=Company.objects.first(),
            first_name="John",
            last_name="Doe",
            phone_number="101-101-1010",
            license_number=5,
            user_id=2,
        )
        self.assert_(
            Technician.objects.filter(
                company=Company.objects.first(),
                first_name="John",
                last_name="Doe",
                phone_number="101-101-1010",
                license_number=5,
                user_id=2,
            ).exists()
        )
        user = User.objects.get(id=technician.user_id)
        # the role is assigned in technician_view.py after the user is created so it needs to be manually assigned for this test
        assign_role(user, "technician")
        self.assert_(has_role(user, "technician") == True)
        self.assert_(has_role(user, "inspector") == False)
