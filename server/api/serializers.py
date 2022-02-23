from rest_framework import serializers
from base.models import BuildingManager

class BuildingManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuildingManager
        fields = ('name', 'phone_number')