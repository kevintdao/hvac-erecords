from rest_framework import serializers
from django.contrib.auth.models import User

# from base.models import Users

# class UsersSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Users
#         fields = '__all__'
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'email', 'password', 'date_joined']

class RegisterUserSerializer(serializers.HyperlinkedModelSerializer):

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user
        
    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'email', 'password', 'date_joined']