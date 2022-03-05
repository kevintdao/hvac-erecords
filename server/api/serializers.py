from rest_framework import serializers

from base.models import Unit
from base.models import BuildingManager
from base.models import Technician
from base.models import Building

class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = '__all__'

class BuildingManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuildingManager
        fields = '__all__'

class TechnicianSerializer(serializers.ModelSerializer):
    class Meta:
        model = Technician
        fields = '__all__'

class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = '__all__'
