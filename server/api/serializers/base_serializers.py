from cgitb import reset

import environ
from base.models import Building, BuildingManager, Company, Technician, Unit
from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.urls import reverse
from django.utils.encoding import (
    DjangoUnicodeDecodeError,
    force_str,
    smart_bytes,
    smart_str,
)
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import serializers
from rolepermissions.roles import assign_role

from .records_serializers import ProfilePlanDisplaySerializer, ProfilePlanSerializer
from .user_serializers import (
    CreateUserSerializer,
    LoginUserSerializer,
    RegisterUserSerializer,
    UserSerializer,
)


class BuildingManagerSerializer(serializers.ModelSerializer):
    users = CreateUserSerializer(many=True)
    company = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = BuildingManager
        fields = ("id", "users", "name", "phone_number", "company")

    def create(self, validated_data):

        env = environ.Env()
        url = env("URL")
        users_data = validated_data.pop("users")

        building_manager = BuildingManager.objects.create(**validated_data)

        for u in users_data:
            user = CreateUserSerializer.create(CreateUserSerializer(), validated_data=u)
            user.company = validated_data["company"]
            user.save()
            building_manager.users.add(user)

            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            # relativeLink = reverse("password-set-confirm", kwargs={'uidb64': uidb64, 'token': token})
            relativeLink = "/password-set/{uidb64}/{token}/".format(
                uidb64=uidb64, token=token
            )
            reset_url = url + relativeLink

            # WHEN IN PRODUCTION UNCOMMENT THIS AND COMMENT OUT ABOVE reset_url LINE
            # reset_url = "https://hvac-erecords.herokuapp.com" + relativeLink

            name = validated_data["name"]
            subject = "Building manager set password"
            message = f"Hello {name}. Set password here: " + reset_url
            from_email = settings.EMAIL_HOST_USER
            to_email = u["email"]

            send_mail(subject, message, from_email, [to_email], fail_silently=False)

        building_manager.save()
        return building_manager

    def save(self, **kwargs):
        user = self.context["request"].user
        kwargs["company"] = user.company
        return super().save(**kwargs)


# Don't update users or company
class BuildingManagerUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuildingManager
        fields = ("name", "phone_number")


class BuildingManagerDisplaySerializer(serializers.ModelSerializer):
    users = LoginUserSerializer(many=True)

    class Meta:
        model = BuildingManager
        fields = "__all__"


class TechnicianSerializer(serializers.ModelSerializer):
    user = CreateUserSerializer()
    company = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Technician
        fields = (
            "user",
            "company",
            "first_name",
            "last_name",
            "phone_number",
            "license_number",
        )

    def save(self, **kwargs):
        user = self.context["request"].user
        kwargs["company"] = user.company
        return super().save(**kwargs)

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user = CreateUserSerializer.create(
            CreateUserSerializer(), validated_data=user_data
        )
        user.company = validated_data["company"]
        user.save()

        env = environ.Env()
        url = env("URL")

        technician, created = Technician.objects.update_or_create(
            user=user,
            company=validated_data["company"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            phone_number=validated_data["phone_number"],
            license_number=validated_data["license_number"],
        )

        uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
        token = PasswordResetTokenGenerator().make_token(user)
        # relativeLink = reverse("password-set-confirm", kwargs={'uidb64': uidb64, 'token': token})
        relativeLink = "/password-set/{uidb64}/{token}/".format(
            uidb64=uidb64, token=token
        )
        reset_url = url + relativeLink

        # WHEN IN PRODUCTION UNCOMMENT THIS AND COMMENT OUT ABOVE reset_url LINE
        # reset_url = "https://hvac-erecords.herokuapp.com" + relativeLink

        name = validated_data["first_name"] + validated_data["last_name"]
        subject = "Technician set password"
        message = f"Hello {name}. Set password here: " + reset_url
        from_email = settings.EMAIL_HOST_USER
        to_email = user_data["email"]

        send_mail(subject, message, from_email, [to_email], fail_silently=False)

        return technician


# Don't update user or company
class TechnicianUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Technician
        fields = ("first_name", "last_name", "phone_number", "license_number")


class TechnicianDisplaySerializer(serializers.ModelSerializer):
    user = LoginUserSerializer(many=False, read_only=True)

    class Meta:
        model = Technician
        fields = "__all__"


class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = "__all__"

    def validate_manager(self, value):
        user = self.context["request"].user
        if value in BuildingManager.objects.for_user(user):
            return value
        raise serializers.ValidationError("Cannot find building manager for this user")


class BuildingDisplaySerializer(serializers.ModelSerializer):
    manager = BuildingManagerDisplaySerializer(many=False, read_only=True)

    class Meta:
        model = Building
        fields = "__all__"


class CompanySerializer(serializers.ModelSerializer):
    users = RegisterUserSerializer(many=True)

    class Meta:
        model = Company
        fields = (
            "id",
            "users",
            "name",
            "street",
            "city",
            "zip_code",
            "country",
            "phone_number",
        )

    def create(self, validated_data):
        users_data = validated_data.pop("users")

        company = Company.objects.create(**validated_data)

        for u in users_data:
            user = RegisterUserSerializer.create(
                RegisterUserSerializer(), validated_data=u
            )
            user.company = company
            user.save()
            company.users.add(user)

        company.save()
        return company


class CompanyUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ("name", "street", "city", "zip_code", "country", "phone_number")


class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = "__all__"

    def validate_building(self, value):
        user = self.context["request"].user
        if value in Building.objects.for_user(user):
            return value
        raise serializers.ValidationError("Cannot find building for this user")


class UnitDisplaySerializer(serializers.ModelSerializer):
    plans = ProfilePlanDisplaySerializer(many=True, read_only=True)
    building = BuildingSerializer(many=False, read_only=True)

    class Meta:
        model = Unit
        fields = "__all__"
