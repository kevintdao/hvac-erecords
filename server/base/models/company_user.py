from operator import mod
from django.db import models
from .company import *
from .user import *

class CompanyUser(models.Model):
    users = models.ManyToManyField(User, related_name="companies")
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
