from django.db import models
from .user import *
from .building_manager import *

class BuildingManagerUser(models.Model):
    user_id = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    manager_id = models.ForeignKey(BuildingManager, on_delete=models.CASCADE)
