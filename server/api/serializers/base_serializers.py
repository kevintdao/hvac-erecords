from rest_framework import serializers
from base.models import Unit, BuildingManager, Technician, Building, Company, User
from django.core.mail import send_mail
from django.conf import settings
from rolepermissions.roles import assign_role

from .records_serializers import ProfilePlanSerializer, ProfilePlanDisplaySerializer
from .user_serializers import UserSerializer, RegisterUserSerializer, CreateUserSerializer

class BuildingManagerSerializer(serializers.ModelSerializer):
    users = RegisterUserSerializer(many=True)

    class Meta:
        model = BuildingManager
        fields = '__all__'

    def create(self, validated_data):
        data = validated_data.pop('users')
    
        buildingmanager = BuildingManager.objects.create(**validated_data)
        
        for u in data:
            user = User.objects.create(email=u['email'], company=validated_data['company'])
            user.save()
            assign_role(user, 'manager')
            buildingmanager.users.add(user)            
            name = validated_data['name']
            subject = 'Email to building manager'
            message = f'Hello {name}. Set password'
            from_email = settings.EMAIL_HOST_USER
            to_email = u['email']

            send_mail(subject, message, from_email, [to_email], fail_silently=False)

        return buildingmanager

    def update(self, instance, validated_data):  
        # data = validated_data.pop('users')
        #BuildingManager.objects.filter(name=validated_data['name']).delete()
        # u = User.objects.filter(username=data)
        # for u in instance.objects:
        #     u.email = validated_data
        #     u.save()
        instance.name=validated_data['name']
        instance.phone_number=validated_data['phone_number']
        instance.company=validated_data['company']
        instance.save()

        return instance

class BuildingManagerDisplaySerializer(serializers.ModelSerializer):
    class Meta:
        model = BuildingManager
        fields = ('id','name','phone_number')

class TechnicianSerializer(serializers.ModelSerializer):
    class Meta:
        model = Technician
        fields = '__all__'

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
    users = CreateUserSerializer(many=True)

    class Meta:
        model = Company
        fields = ('id', 'users', 'name', 'street', 'city', 'zip_code', 'country', 'phone_number')

    def create(self, validated_data):
        users_data = validated_data.pop('users')
    
        company = Company.objects.create(**validated_data)
        
        for u in users_data:
            user = CreateUserSerializer.create(CreateUserSerializer(), validated_data=u)
            assign_role(user, 'manager')
            user.company = company
            user.save()
            company.users.add(user)   

        company.save()
        return company

class CompanyUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ('name', 'street', 'city', 'zip_code', 'country', 'phone_number')

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