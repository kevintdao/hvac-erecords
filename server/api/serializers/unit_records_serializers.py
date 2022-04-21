from rest_framework import serializers
from base.models import Unit, Building, Technician
from records.models import ServiceVisit, TaskCompletion


class BuildingDisplaySerializer(serializers.ModelSerializer):

    class Meta:
        model = Building
        fields = ['site_name', 'street', 'city', 'zip_code', 'country']

class TechnicianDisplaySerializer(serializers.ModelSerializer):
    id = serializers.PrimaryKeyRelatedField(source='user',read_only=True)
    affiliation = serializers.CharField(source='company.name',read_only=True)

    class Meta:
        model = Technician
        fields = ['id', 'first_name', 'last_name', 'license_number', 'affiliation']

class ServiceVisitDisplaySerializer(serializers.ModelSerializer):

    class Meta:
        model = ServiceVisit
        fields = ['id', 'technician', 'start_time', 'end_time']

class TaskCompletionDisplaySerializer(serializers.ModelSerializer):
    visit = serializers.PrimaryKeyRelatedField(source='service_visit',read_only=True)
    task_id = serializers.PrimaryKeyRelatedField(source='task', read_only=True)
    task_title = serializers.CharField(source='task.title',read_only=True)
    task_description = serializers.CharField(source='task.description',read_only=True)

    class Meta:
        model = TaskCompletion
        fields = ['id','task_id','task_title','task_description','completed_at','selection','response','value','visit']

class UnitRecordsSerializer(serializers.ModelSerializer):
    building = BuildingDisplaySerializer(many=False,read_only=True)
    visits = ServiceVisitDisplaySerializer(many=True,read_only=True)
    technicians = serializers.SerializerMethodField()
    task_completions = serializers.SerializerMethodField()

    class Meta:
        model = Unit
        fields = ['id', 'external_id', 'category', 'serial_number', 
        'model_number', 'manufacturer', 'production_date', 'installation_date',
        'building', 'visits', 'task_completions', 'technicians']

    def get_task_completions(self, unit):
        task_completions = TaskCompletion.objects.filter(
            service_visit__unit=unit
        )
        return TaskCompletionDisplaySerializer(
            task_completions,
            many=True
        ).data
    
    def get_technicians(self, unit):
        technicians = Technician.objects.filter(
            visits__unit=unit
        )
        return TechnicianDisplaySerializer(
            technicians,
            many=True
        ).data
