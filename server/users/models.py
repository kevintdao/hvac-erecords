from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext as _
from .managers import CustomUserManager

class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)

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
