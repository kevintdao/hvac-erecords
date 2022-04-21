from rest_framework import serializers
from base.models import Unit, Building
from records.models import ServiceVisit, TaskCompletion


class BuildingDisplaySerializer(serializers.ModelSerializer):

    class Meta:
        model = Building
        fields = ['site_name', 'street', 'city', 'zip_code', 'country']

class ServiceVisitDisplaySerializer(serializers.ModelSerializer):

    class Meta:
        model = ServiceVisit
        fields = ['id', 'technician', 'start_time', 'end_time']

class TaskCompletionDisplaySerializer(serializers.ModelSerializer):
    visit = serializers.PrimaryKeyRelatedField(source='service_visit',read_only=True)

    class Meta:
        model = TaskCompletion
        fields = ['id','task','completed_at','selection','response','value','visit']

class UnitRecordsSerializer(serializers.ModelSerializer):
    building = BuildingDisplaySerializer(many=False,read_only=True)
    visits = ServiceVisitDisplaySerializer(many=True,read_only=True)
    task_completions = serializers.SerializerMethodField()

    class Meta:
        model = Unit
        fields = ['id', 'external_id', 'category', 'serial_number', 
        'model_number', 'manufacturer', 'production_date', 'installation_date',
        'building', 'visits', 'task_completions']

    def get_task_completions(self, unit):
        task_completions = TaskCompletion.objects.filter(
            service_visit__unit=unit
        )
        return TaskCompletionDisplaySerializer(
            task_completions,
            many=True
        ).data