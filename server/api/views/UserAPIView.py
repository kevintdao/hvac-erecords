from rest_framework.generics import RetrieveAPIView
from rest_framework import permissions
from api.serializers import UserSerializer

class UserAPIView(RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user