from re import S
from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import Unit, BuildingManager, Technician, Building, Company
from records.models import Task, Profile, ProfileTask, ProfilePlan, ServiceVisit, TaskCompletion
from django.utils import timezone

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'date_joined']

class RegisterUserSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['email'],
            password=validated_data['password']
        )
        return user
        
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'date_joined']

class LoginUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'last_login', 'username', 'email']

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

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class ProfileTaskPositionSerializer(serializers.ModelSerializer):
    task = TaskSerializer(read_only=True)
    task_id = serializers.PrimaryKeyRelatedField(write_only=True, source='task', queryset=Task.objects.all())

    class Meta:
        model = ProfileTask
        fields = ('task', 'task_id', 'position')

        
class ProfileCreateSerializer(serializers.ModelSerializer):
    tasks = ProfileTaskPositionSerializer(many=True)

    class Meta:
        model = Profile
        fields = ('id', 'title', 'description', 'tasks')

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

class ProfileTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileTask
        fields = ('task_id', 'position')

class ProfileDisplaySerializer(serializers.ModelSerializer):
    tasks = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ('id', 'title', 'description', 'tasks')

    def get_tasks(self, profile_instance):
        query_datas = ProfileTask.objects.filter(profile=profile_instance)
        return [ProfileTaskSerializer(task).data for task in query_datas]

class ProfilePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfilePlan
        fields = '__all__'

class UnitSerializer(serializers.ModelSerializer):
    plans = ProfilePlanSerializer(many=True,read_only=True)

    class Meta:
        model = Unit
        fields = '__all__'

class ServiceVisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceVisit
        fields = '__all__'

    def validate(self, data):
        if data['end_time'] is not None and data['start_time'] > data['end_time']:
            raise serializers.ValidationError("End time must occur after start time")
        return data