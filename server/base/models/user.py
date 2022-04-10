from django.db import models
from django.contrib.auth.models import User

class User(User):
    COMPANY = 1
    MANAGER = 2
    TECHNICIAN = 3
    INSPECTOR = 4

    ROLE_CHOICES = (
        (COMPANY, 'Company'),
        (MANAGER, 'Manager'),
        (TECHNICIAN, 'Technician'),
        (INSPECTOR, 'Inspector')
    )

    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, blank=True, null=True)
