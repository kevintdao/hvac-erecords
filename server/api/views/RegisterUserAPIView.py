from rest_framework.generics import CreateAPIView
from api.serializers import RegisterUserSerializer
from rest_framework import permissions


class RegisterUserAPIView(CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterUserSerializer
