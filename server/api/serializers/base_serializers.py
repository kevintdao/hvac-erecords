from rest_framework import serializers
from base.models import Unit, BuildingManager, Technician, Building, Company, User
from django.core.mail import send_mail
from django.conf import settings
from rolepermissions.roles import assign_role

from .records_serializers import ProfilePlanSerializer
from .user_serializers import UserSerializer, RegisterUserSerializer

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

class CompanyUserSerializer(serializers.ModelSerializer):
    users = RegisterUserSerializer(many=True)
    
    def create(self, validated_data):
        data_users = validated_data.pop('users')
        data_company = validated_data.pop('company')

        new_company = Company.objects.create(email=data_company['email'], name=data_company['name'], phone=data_company['phone'],
                                            street=data_company['street'], city=data_company['city'],
                                            zip_code=data_company['zip_code'], country=data_company['country'])
        new_company.save()

        for u in data_users:
            new_user = User.objects.create(email=u['email'], company=new_company)
            new_user.save()
            assign_role(new_user, 'company')
            new_company.users.add(new_user)
        
        return new_company
    
    def update(self, instance, validated_data):
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
    plans = ProfilePlanSerializer(many=True,read_only=True)
    building = BuildingSerializer(many=False, read_only=True)

    class Meta:
        model = Unit
        fields = '__all__'