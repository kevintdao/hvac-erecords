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
        fields = ['url', 'id', 'email', 'password', 'date_joined']