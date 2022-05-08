from rest_framework.generics import RetrieveAPIView
from rest_framework import permissions
from api.serializers import LoginUserSerializer


class UserAPIView(RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LoginUserSerializer

    def get_object(self):
        return self.request.user
