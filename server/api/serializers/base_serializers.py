from cgitb import reset
from rest_framework import serializers
from base.models import Unit, BuildingManager, Technician, Building, Company, User
from django.core.mail import send_mail
from django.conf import settings
from rolepermissions.roles import assign_role
from django.urls import reverse
from .records_serializers import ProfilePlanSerializer, ProfilePlanDisplaySerializer
from .user_serializers import UserSerializer, RegisterUserSerializer, CreateUserSerializer, LoginUserSerializer

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode


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
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            # relativeLink = reverse("password-set-confirm", kwargs={'uidb64': uidb64, 'token': token})
            relativeLink = "/password-set/{uidb64}/{token}/".format(uidb64=uidb64, token=token)
            reset_url = "http://localhost:3000" + relativeLink

            # WHEN IN PRODUCTION UNCOMMENT THIS AND COMMENT OUT ABOVE reset_url LINE
            # reset_url = "https://hvac-erecords.herokuapp.com" + relativeLink

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

class BuildingManagerDisplaySerializer(serializers.ModelSerializer):
    users = LoginUserSerializer(many=True)
    class Meta:
        model = BuildingManager
        fields = '__all__'


class TechnicianSerializer(serializers.ModelSerializer):
    user = CreateUserSerializer(many=False)
    class Meta:
        model = Technician
        fields = '__all__'
    
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create(email=user_data["email"], company=validated_data["company"])

        user.save()
        assign_role(user, 'technician')
        # technician_data = {"first_name": validated_data["first_name"],'last_name': validated_data["last_name"], 'phone_number': validated_data['phone_number'], 'license_number': validated_data['license_number'], 'company': validated_data['company'], 'user_id': user.id }
        
        technician = Technician.objects.create(first_name= validated_data["first_name"],last_name= validated_data["last_name"], phone_number= validated_data['phone_number'], license_number= validated_data['license_number'], company= validated_data['company'], user_id= user.id)
        uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
        token = PasswordResetTokenGenerator().make_token(user)
        # relativeLink = reverse("password-set-confirm", kwargs={'uidb64': uidb64, 'token': token})
        relativeLink = "/password-set/{uidb64}/{token}/".format(uidb64=uidb64, token=token)
        reset_url = "http://localhost:3000" + relativeLink

        # WHEN IN PRODUCTION UNCOMMENT THIS AND COMMENT OUT ABOVE reset_url LINE
        # reset_url = "https://hvac-erecords.herokuapp.com" + relativeLink
        
        name = validated_data["first_name"] + validated_data["last_name"]
        subject = 'Technician set password'
        message = f'Hello {name}. Set password here: ' + reset_url
        from_email = settings.EMAIL_HOST_USER
        to_email = user_data["email"]

        send_mail(subject, message, from_email, [to_email], fail_silently=False)

        return technician


    def update(self, instance, validated_data): 
        instance.first_name=validated_data['first_name']
        instance.first_name=validated_data['last_name']
        instance.phone_number=validated_data['phone_number']
        instance.company=validated_data['company']
        instance.license_number=validated_data['license_number']


        return instance

class TechnicianDisplaySerializer(serializers.ModelSerializer):
    user = LoginUserSerializer(many=False, read_only=True)
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