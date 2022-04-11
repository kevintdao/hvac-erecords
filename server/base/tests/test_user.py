from re import T
from django.db import DataError
from django.test import TestCase
from base.models import User, Technician, Company

def test_created_valid_technician_user(self):
        technician = User.objects.create(email = 'test@test.com', password_hash = 'temporary')
        technician.role = User.TECHNICIAN
        self.assert_(User.objects.filter(email = 'test@test.com', password_hash = 'temporary').exists())
        self.assert_(technician.role == User.TECHNICIAN)
