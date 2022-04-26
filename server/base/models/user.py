from django.contrib.auth.models import AbstractUser
from django.db import models
from .company import *
from django.utils.translation import gettext_lazy as _
from .user_manager import *

class User(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

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
