from rest_framework import serializers
from base.models import Unit, Building
from records.models import Task, Profile, ProfileTask, ProfilePlan, ServiceVisit, TaskCompletion


class BuildingDisplaySerializer(serializers.ModelSerializer):

    class Meta:
        model = Building
        fields = ['site_name', 'street', 'city', 'zip_code', 'country']


class UnitRecordsSerializer(serializers.ModelSerializer):
    building = BuildingDisplaySerializer(many=False,read_only=True)

    class Meta:
        model = Unit
        fields = ['id', 'external_id', 'category', 'serial_number', 
        'model_number', 'manufacturer', 'production_date', 'installation_date',
        'building']