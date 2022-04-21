from rest_framework import serializers
from base.models import Unit, BuildingManager, Technician, Building, Company
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings

from .record_serializers import ProfilePlanSerializer
from .user_serializers import UserSerializer

class BuildingManagerSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True)

    class Meta:
        model = BuildingManager
        fields = '__all__'

    def create(self, validated_data):
        data = validated_data.pop('users')
    
        buildingmanager = BuildingManager.objects.create(**validated_data)
        
        for u in data:
            user = User.objects.create_user(
                email=u['email'],
                username=u['email']
            )
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
        instance.name=validated_data['name']
        instance.phone_number=validated_data['phone_number']
        instance.company=validated_data['company']
        instance.save()

        return instance

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

class UnitSerializer(serializers.ModelSerializer):
    plans = ProfilePlanSerializer(many=True,read_only=True)

    class Meta:
        model = Unit
        fields = '__all__'