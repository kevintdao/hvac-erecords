from cgitb import reset
from rest_framework import serializers
from base.models import Unit, BuildingManager, Technician, Building, Company, User
# from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings
from rolepermissions.roles import assign_role

from .records_serializers import ProfilePlanSerializer
from .user_serializers import UserSerializer, RegisterUserSerializer

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

from django.urls import reverse

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

            uidb64 = urlsafe_base64_encode(user.id)
            token = PasswordResetTokenGenerator().make_token(user)
            relativeLink = reverse("password-set-confirm", kwargs={'uidb64': uidb64, 'token': token})
            reset_url = "http://127.0.0.1/" + relativeLink
            name = validated_data['name']
            subject = 'Building manager set password'
            message = f'Hello {name}. Set password here: ' + reset_url
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