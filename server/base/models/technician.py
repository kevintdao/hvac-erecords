from django.db import models
from django.contrib.auth.models import User

class Technician(models.Model):
    user_id = models.ForeignKey('User')
    # user = models.OneToOneField(User, on_delete=models.CASCADE, default=1)
    company_id = models.IntegerField()
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=32)
    license_number = models.IntegerField()
    owner = models.ForeignKey('User')

    @staticmethod
    def has_read_permission(request):
        return True
      
    def has_object_read_permission(self, request):
        return True
      
    @staticmethod
    def has_write_permission(request):
        return False
      
    @staticmethod
    def has_create_permission(request):
        return True