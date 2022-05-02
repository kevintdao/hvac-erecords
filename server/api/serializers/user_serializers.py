from rest_framework import serializers
# from django.contrib.auth.models import User
from base.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role', 'company', 'date_joined']

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
        fields = ['id', 'last_login', 'username', 'email', 'role', 'company']

class SetPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=6, max_length=40, write_only=True)
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)
