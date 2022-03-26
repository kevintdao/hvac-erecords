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


class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = '__all__'

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
