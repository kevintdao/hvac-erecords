from rest_framework import serializers
from base.models import Unit
from records.models import Task, Profile, ProfileTask, ProfilePlan, ServiceVisit, TaskCompletion


class UnitRecordsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Unit
        fields = '__all__'