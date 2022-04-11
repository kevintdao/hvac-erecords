from rest_framework.generics import CreateAPIView
from api.serializers import RegisterUserSerializer
from rest_framework import permissions
from django.core.mail import send_mail

class RegisterUserAPIView(CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterUserSerializer