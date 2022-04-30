from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.models import Building, BuildingManager
from api.serializers import BuildingSerializer
from rest_framework import status
from rolepermissions.checkers import has_permission, has_role

@api_view(['GET','POST'])  
@permission_classes([IsAuthenticated])
def apiBuildings(request):
    # List buildings
    if request.method == 'GET' and has_permission(request.user, 'get_buildings'):
        if (has_role(request.user,'company')):
            managers = BuildingManager.objects.filter(company=request.user.company)
            buildings = Building.objects.filter(manager__in=managers)
        serializer = BuildingSerializer(buildings, many=True)
        return Response(serializer.data)
    # Create building
    elif request.method == 'POST' and has_permission(request.user, 'create_buildings'):
        serializer = BuildingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response("This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED)
    

@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])   
def apiBuilding(request,pk):
    try:
        if (has_role(request.user,'company')):
            managers = BuildingManager.objects.filter(company=request.user.company)
            building = Building.objects.filter(manager__in=managers).get(pk=pk)
    except Building.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Detail of building
    if request.method == 'GET' and has_permission(request.user, 'view_buildings'):
        serializer = BuildingSerializer(building, many=False)
        return Response(serializer.data)
    # Update building
    elif request.method == 'PUT' and has_permission(request.user, 'update_buildings'):
        serializer = BuildingSerializer(building, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE' and has_permission(request.user, 'delete_buildings'):
        building.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response("This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED)