from rest_framework import serializers
from base.models import Technician, Unit
from records.models import Task, Profile, ProfileTask, ProfilePlan, ServiceVisit, TaskCompletion

class TaskSerializer(serializers.ModelSerializer):
    company = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Task
        fields = '__all__'

    def save(self, **kwargs):
        user = self.context['request'].user
        kwargs["company"] = user.company
        return super().save(**kwargs)

class ProfileTaskPositionSerializer(serializers.ModelSerializer):
    task = TaskSerializer(read_only=True)
    task_id = serializers.PrimaryKeyRelatedField(write_only=True, source='task', queryset=Task.objects.all())

    class Meta:
        model = ProfileTask
        fields = ('task', 'task_id', 'position')

        
class ProfileCreateSerializer(serializers.ModelSerializer):
    tasks = ProfileTaskPositionSerializer(many=True)
    company = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Profile
        fields = ('id', 'company', 'title', 'description', 'tasks')

    def validate_tasks(self, values):
        user = self.context['request'].user
        for value in values:
            if value['task'] not in Task.objects.for_user(user):
                raise serializers.ValidationError('Cannot find task for this user')
        return values

    def create(self, validated_data):
        tasks_data = validated_data.pop('tasks')
        profile = Profile.objects.create(**validated_data)
        for task_data in tasks_data:
            ProfileTask.objects.create(
                profile=profile,
                task=task_data.get('task'),
                position=task_data.get('position'))
        return profile

    def update(self, instance, validated_data):
        tasks_data = validated_data.pop('tasks')
        # maybe should not do it this way
        ProfileTask.objects.filter(profile=instance).delete()
        
        instance.title = validated_data.get('title')
        instance.description = validated_data.get('description')
        instance.save()

        for task_data in tasks_data:
            ProfileTask.objects.create(
                profile=instance,
                task=task_data.get('task'),
                position=task_data.get('position'))
                
        return instance

    def save(self, **kwargs):
        user = self.context['request'].user
        kwargs["company"] = user.company
        return super().save(**kwargs)


class ProfileTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileTask
        fields = ('task_id', 'position')

class ProfileDisplaySerializer(serializers.ModelSerializer):
    tasks = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ('id', 'tag', 'title', 'description', 'tasks')

    def get_tasks(self, profile_instance):
        query_datas = ProfileTask.objects.filter(profile=profile_instance)
        return [ProfileTaskSerializer(task).data for task in query_datas]

class ProfilePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfilePlan
        fields = '__all__'

    def validate_unit(self, value):
        user = self.context['request'].user
        if value in Unit.objects.for_user(user):
            return value
        raise serializers.ValidationError('Cannot find unit for this user')

    def validate_profile(self, value):
        user = self.context['request'].user
        if value in Profile.objects.for_user(user):
            return value
        raise serializers.ValidationError('Cannot find profile for this user')

class ServiceVisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceVisit
        fields = '__all__'

    def validate(self, data):
        if data['end_time'] is not None and data['start_time'] > data['end_time']:
            raise serializers.ValidationError("End time must occur after start time")
        return data

    def validate_technician(self, value):
        user = self.context['request'].user
        if value in Technician.objects.for_user(user):
            return value
        raise serializers.ValidationError('Cannot find technician for this user')

    def validate_unit(self, value):
        user = self.context['request'].user
        if value in Unit.objects.for_user(user):
            return value
        raise serializers.ValidationError('Cannot find unit for this user')

    def validate_plan(self, value):
        user = self.context['request'].user
        if value in ProfilePlan.objects.for_user(user):
            return value
        raise serializers.ValidationError('Cannot find profile plan for this user')

class TaskCompletionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskCompletion
        fields = '__all__'

    def validate(self, data):
        service_visit = data['service_visit']
        if (data['completed_at'] < service_visit.start_time) or (service_visit.end_time is not None and data['completed_at'] > service_visit.end_time):
            raise serializers.ValidationError("Task completion is not in service visit start/end time range")
        return data

    def validate_task(self, value):
        user = self.context['request'].user
        if value in Task.objects.for_user(user):
            return value
        raise serializers.ValidationError('Cannot find task for this user')

    def validate_service_visit(self, value):
        user = self.context['request'].user
        if value in ServiceVisit.objects.for_user(user):
            return value
        raise serializers.ValidationError('Cannot find service visit for this user')