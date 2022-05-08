from re import T
from django.db import DataError
from django.test import TestCase
from base.models import Technician, Company


class TechnicianModelTests(TestCase):
    fixtures = [
        "test_data.json",
    ]

    def test_created_valid_technician(self):
        Technician.objects.create(
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

    def test_created_invalid_technician(self):
        with self.assertRaises(DataError):
            Technician.objects.create(
                company=Company.objects.first(),
                first_name="John",
                last_name="Doe",
                phone_number="101-101-1010 101-101-1010 101-101-1010 101-101-1010",
                license_number=5,
            )

    def test_full_name_technician(self):
        Technician.objects.create(
            company=Company.objects.first(),
            first_name="John",
            last_name="Doe",
            phone_number="101-101-1010",
            license_number=5,
            user_id=2,
        )
        self.assert_(
            Technician.objects.filter(first_name="John", last_name="Doe")
            .first()
            .full_name(),
            "John Doe",
        )
