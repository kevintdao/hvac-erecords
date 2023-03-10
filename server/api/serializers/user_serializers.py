from rest_framework import serializers

# from django.contrib.auth.models import User
from base.models import User
from django.utils.encoding import (
    force_str,
)
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_decode
from rest_framework.exceptions import AuthenticationFailed


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "password",
            "role",
            "company",
            "date_joined",
        ]


class RegisterUserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            username=validated_data["email"],
            password=validated_data["password"],
        )
        return user

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "date_joined"]


class LoginUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "last_login", "username", "email", "role", "company"]


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email"]


class SetPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=6, max_length=40, write_only=True)
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)

    class Meta:
        fields = ["password", "token", "uidb64"]

    def validate(self, attrs):
        try:
            password = attrs.get("password")
            token = attrs.get("token")
            uidb64 = attrs.get("uidb64")
            user_id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=user_id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed("The set password link is invalid", 401)

            user.set_password(password)
            user.save()

        except Exception as e:
            raise AuthenticationFailed("The set password link is invalid", 401)
        return super().validate(attrs)
