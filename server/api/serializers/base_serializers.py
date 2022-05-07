from rest_framework import serializers
from base.models import Unit, BuildingManager, Technician, Building, Company
from django.core.mail import send_mail
from django.conf import settings
from rolepermissions.roles import assign_role

from .records_serializers import ProfilePlanSerializer, ProfilePlanDisplaySerializer
from .user_serializers import UserSerializer, RegisterUserSerializer, CreateUserSerializer

class BuildingManagerSerializer(serializers.ModelSerializer):
    users = CreateUserSerializer(many=True)
    company = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = BuildingManager
        fields = ('id', 'users', 'name', 'phone_number', 'company')

    def create(self, validated_data):
        users_data = validated_data.pop('users')
    
        building_manager = BuildingManager.objects.create(**validated_data)
        
        for u in users_data:
            user = CreateUserSerializer.create(CreateUserSerializer(), validated_data=u)
            assign_role(user, 'manager')
            user.company = validated_data['company']
            user.save()
            building_manager.users.add(user)   

        building_manager.save()
        return building_manager

    def save(self, **kwargs):
        user = self.context['request'].user
        kwargs["company"] = user.company
        return super().save(**kwargs)

# Don't update users or company
class BuildingManagerUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuildingManager
        fields = ('name', 'phone_number')

class BuildingManagerDisplaySerializer(serializers.ModelSerializer):
    class Meta:
        model = BuildingManager
        fields = ('id','name','phone_number')

class TechnicianSerializer(serializers.ModelSerializer):
    user = CreateUserSerializer()
    company = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Technician
        fields = ('user', 'company', 'first_name', 'last_name', 'phone_number', 'license_number')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = CreateUserSerializer.create(CreateUserSerializer(), validated_data=user_data)
        assign_role(user, 'technician')
        user.company = validated_data['company']
        user.save()
        student, created = Technician.objects.update_or_create(user=user,
                            company=validated_data['company'],
                            first_name=validated_data['first_name'],
                            last_name=validated_data['last_name'],
                            phone_number=validated_data['phone_number'],
                            license_number=validated_data['license_number'])
        return student
    
    def save(self, **kwargs):
        user = self.context['request'].user
        kwargs["company"] = user.company
        return super().save(**kwargs)

# Don't update user or company
class TechnicianUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Technician
        fields = ('first_name', 'last_name', 'phone_number', 'license_number')

class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = '__all__'

    def validate_manager(self, value):
        user = self.context['request'].user
        if value in BuildingManager.objects.for_user(user):
            return value
        raise serializers.ValidationError('Cannot find building manager for this user')

class BuildingDisplaySerializer(serializers.ModelSerializer):
    manager = BuildingManagerDisplaySerializer(many=False, read_only=True)

    class Meta:
        model = Building
        fields = '__all__' 

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = '__all__'

    def validate_building(self, value):
        user = self.context['request'].user
        if value in Building.objects.for_user(user):
            return value
        raise serializers.ValidationError('Cannot find building for this user')      

class UnitDisplaySerializer(serializers.ModelSerializer):
    plans = ProfilePlanDisplaySerializer(many=True,read_only=True)
    building = BuildingSerializer(many=False, read_only=True)

    class Meta:
        model = Unit
        fields = '__all__'