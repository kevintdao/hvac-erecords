from rest_framework import serializers
from rest_framework.utils.serializer_helpers import ReturnDict
from base.models import Unit, Building, Technician
from records.models import ServiceVisit, TaskCompletion, ProfilePlan, Profile

class DictSerializer(serializers.ListSerializer):
    """
    Overrides default ListSerializer to return a dict with a custom field from
    each item as the key. Makes it easier to normalize the data so that there
    is minimal nesting. dict_key defaults to 'id' but can be overridden.
    """
    dict_key = 'id'
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



class FullChargeSerializer(serializers.ModelSerializer):
    time = serializers.DateTimeField(source='end_time',read_only=True)
    value = serializers.SerializerMethodField()
    method = serializers.SerializerMethodField()

    class Meta:
        model = ServiceVisit
        fields = ['time', 'value', 'method']

    def get_value(self, visit):
        ## TODO: determine if we want to assume task_id is in correct order
        return visit.completions.all().order_by('task_id')[0].value

    def get_method(self, visit):
        return visit.completions.all().order_by('task_id')[1].response


class RefrigerantReportSerializer(serializers.ModelSerializer):
    operator = serializers.CharField(source='building.manager.name',read_only=True)
    street = serializers.CharField(source='building.street',read_only=True)
    city = serializers.CharField(source='building.city',read_only=True)
    zip_code = serializers.CharField(source='building.zip_code',read_only=True)
    country = serializers.CharField(source='building.country',read_only=True)
    full_charge = serializers.SerializerMethodField()

    class Meta:
        model = Unit
        fields = ('id', 'serial_number', 'operator', 'street', 'city', 'zip_code', 'country', 'full_charge')

    def get_full_charge(self, unit):
        profile = Profile.objects.filter(tag="epa608-charge").first()
        # TODO: What if plan changes/deleted
        visits = ServiceVisit.objects.filter(unit=unit,plan__profile=profile)

        return FullChargeSerializer(
            visits,
            many=True
        ).data