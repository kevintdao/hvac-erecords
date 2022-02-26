from rest_framework import serializers
from base.models import Technician

class TechnicianSerializer(serializers.ModelSerializer):
    class Meta:
        model = Technician
        fields = '__all__'
