from base64 import urlsafe_b64decode
from rest_framework.generics import GenericAPIView
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework import status
from rest_framework.response import Response
from django.utils.encoding import (
    smart_str,
    DjangoUnicodeDecodeError,
)
from base.models import User


class PasswordTokenCheckAPI(GenericAPIView):
    def get(self, request, uidb64, token):
        try:
            user_id = smart_str(urlsafe_b64decode(uidb64))
            user = User.objects.get(id=user_id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response(
                    {"error": "Token is not valid"}, status=status.HTTP_401_UNAUTHORIZED
                )

            return Response(
                {
                    "success": True,
                    "message": "Credentials Valid",
                    "uidb64": uidb64,
                    "token": token,
                },
                status=status.HTTP_200_OK,
            )

        except DjangoUnicodeDecodeError as identifer:
            return Response(
                {"error": "Token is not valid"}, status=status.HTTP_401_UNAUTHORIZED
            )
