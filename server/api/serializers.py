from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import Unit
from base.models import BuildingManager
from base.models import Technician
from base.models import Building

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

class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = '__all__'

class BuildingManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuildingManager
        fields = '__all__'

class TechnicianSerializer(serializers.BaseSerializer):
    def to_internal_value(self, data):
        user = data.get('user')
        company = data.get('company')
        first_name = data.get('frist_name')
        last_name=data.get('last_name')
        phone_number=data.get('phone_number')
        license_number=data.get('license_number')
        return {
            'user': user,
            'company': company,
            'first_name': first_name,
            'last_name': last_name,
            'phone_number': phone_number,
            'license_number': license_number
        }
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['email'],
            password=validated_data['password']
        )

        technician = Technician.objects.create(
            user=user,
            company=validated_data['company'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone_number=validated_data['phone_number'],
            license_number=validated_data['license_number']
        )
        return technician

    class Meta:
        model = Technician
        fields = '__all__'

class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = '__all__'
