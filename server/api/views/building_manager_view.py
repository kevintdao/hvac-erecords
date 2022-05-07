from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.models import BuildingManager
from api.serializers import BuildingManagerSerializer, BuildingManagerUpdateSerializer
from rest_framework import status
from rolepermissions.checkers import has_permission


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def apiManagers(request):
    # List managers
    if request.method == 'GET' and has_permission(request.user, 'get_managers'):
        managers = BuildingManager.objects.for_user(request.user)
        serializer = BuildingManagerSerializer(managers, many=True)
        return Response(serializer.data)
    # Create manager
    elif request.method == 'POST' and has_permission(request.user, 'create_managers'):
        serializer = BuildingManagerSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response("This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def apiManager(request, pk):
    try:
        manager = BuildingManager.objects.for_user(request.user).get(pk=pk)
    except BuildingManager.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Detail of manager
    if request.method == 'GET' and has_permission(request.user, 'view_managers'):
        serializer = BuildingManagerSerializer(manager, many=False)
        return Response(serializer.data)
    # Update manager
    elif request.method == 'PUT' and has_permission(request.user, 'update_managers'):
        serializer = BuildingManagerUpdateSerializer(manager, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE' and has_permission(request.user, 'delete_managers'):
        manager.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response("This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED)
