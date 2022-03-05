from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Building
from api.serializers import BuildingSerializer
from rest_framework import status

@api_view(['GET','POST'])   
def apiBuildings(request):
    # List buildings
    if request.method == 'GET':
        buildings = Building.objects.all()
        serializer = BuildingSerializer(buildings, many=True)
        return Response(serializer.data)
    # Create building
    elif request.method == 'POST':
        serializer = BuildingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET','PUT','DELETE'])   
def apiBuilding(request,pk):
    try:
        building = Building.objects.get(pk=pk)
    except Building.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Detail of building
    if request.method == 'GET':
        serializer = BuildingSerializer(building, many=False)
        return Response(serializer.data)
    # Update building
    elif request.method == 'PUT':
        serializer = BuildingSerializer(building, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        building.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)