from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from api.serializers import CompanyUserSerializer
from rest_framework import status

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def apiCompanyUsers(request):
    # Create company user
    if request.method == 'POST':
        serializer = CompanyUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response("This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED)
