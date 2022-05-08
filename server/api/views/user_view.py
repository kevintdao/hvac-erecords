from rest_framework import viewsets
from rest_framework import permissions
from api.serializers import UserSerializer

# from django.contrib.auth.models import User
from base.models import User


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
