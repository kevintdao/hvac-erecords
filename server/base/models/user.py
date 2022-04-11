from django.db import models
from django.contrib.auth.models import AbstractBaseUser

class User(AbstractBaseUser):
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

    # def set_role(self, id):
    #     self.role = id
    #     self.save()
