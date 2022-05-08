from rest_framework import serializers
from rest_framework.utils.serializer_helpers import ReturnDict
from base.models import Unit, Building, Technician
from records.models import ServiceVisit, TaskCompletion, ProfilePlan


class DictSerializer(serializers.ListSerializer):
    """
    Overrides default ListSerializer to return a dict with a custom field from
    each item as the key. Makes it easier to normalize the data so that there
    is minimal nesting. dict_key defaults to 'id' but can be overridden.
    """

    dict_key = "id"

    @property
    def data(self):
        """
        Overriden to return a ReturnDict instead of a ReturnList.
        """
        ret = super(serializers.ListSerializer, self).data
        return ReturnDict(ret, serializer=self)

    def to_representation(self, data):
        """
        Converts the data from a list to a dictionary.
        """
        items = super(DictSerializer, self).to_representation(data)
        return {item[self.dict_key]: item for item in items}


class BuildingRecordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ["site_name", "street", "city", "zip_code", "country"]


class TechnicianRecordsSerializer(serializers.ModelSerializer):
    id = serializers.PrimaryKeyRelatedField(source="user", read_only=True)
    affiliation = serializers.CharField(source="company.name", read_only=True)

    class Meta:
        model = Technician
        fields = ["id", "first_name", "last_name", "license_number", "affiliation"]
        list_serializer_class = DictSerializer


class ServiceVisitRecordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceVisit
        fields = ["id", "technician", "start_time", "end_time", "plan"]
        list_serializer_class = DictSerializer


class TaskCompletionRecordsSerializer(serializers.ModelSerializer):
    visit = serializers.PrimaryKeyRelatedField(source="service_visit", read_only=True)
    task_id = serializers.PrimaryKeyRelatedField(source="task", read_only=True)
    task_title = serializers.CharField(source="task.title", read_only=True)
    task_description = serializers.CharField(source="task.description", read_only=True)
    task_rule = serializers.JSONField(source="task.rule", read_only=True)

    class Meta:
        model = TaskCompletion
        fields = [
            "id",
            "task_id",
            "task_title",
            "task_description",
            "task_rule",
            "completed_at",
            "selection",
            "response",
            "value",
            "visit",
        ]
        list_serializer_class = DictSerializer


class ProfilePlanRecordsSerializer(serializers.ModelSerializer):
    profile_id = serializers.PrimaryKeyRelatedField(source="profile", read_only=True)
    profile_title = serializers.CharField(source="profile.title", read_only=True)
    profile_description = serializers.CharField(
        source="profile.description", read_only=True
    )

    class Meta:
        model = ProfilePlan
        fields = [
            "id",
            "profile_id",
            "profile_title",
            "profile_description",
            "start_date",
            "end_date",
            "is_required",
            "is_repeating",
        ]
        list_serializer_class = DictSerializer


class UnitRecordsSerializer(serializers.ModelSerializer):
    building = BuildingRecordsSerializer(many=False, read_only=True)
    visits = ServiceVisitRecordsSerializer(many=True, read_only=True)
    technicians = serializers.SerializerMethodField()
    task_completions = serializers.SerializerMethodField()
    plans = ProfilePlanRecordsSerializer(many=True, read_only=True)

    class Meta:
        model = Unit
        fields = [
            "id",
            "external_id",
            "category",
            "serial_number",
            "model_number",
            "manufacturer",
            "production_date",
            "installation_date",
            "building",
            "visits",
            "task_completions",
            "technicians",
            "plans",
        ]

    def get_task_completions(self, unit):
        task_completions = TaskCompletion.objects.filter(service_visit__unit=unit)
        return TaskCompletionRecordsSerializer(task_completions, many=True).data

    def get_technicians(self, unit):
        technicians = Technician.objects.filter(visits__unit=unit)
        return TechnicianRecordsSerializer(technicians, many=True).data
