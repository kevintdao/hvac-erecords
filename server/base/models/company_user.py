from django.db import models
from .user import *
from .company import *

class CompanyUser(models.Model):
    user_id = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE)
