import re
from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import BuildingManager
from api.serializers import BuildingManagerSerializer
from rest_framework import status

@api_view(['GET','POST'])   
def apiManagers(request):
    # List managers
    if request.method == 'GET':
        managers = BuildingManager.objects.all()
        serializer = BuildingManagerSerializer(managers, many=True)
        return Response(serializer.data)
    # Create manager
    elif request.method == 'POST':
        if ("company" not in request.data):
            request.data["company"] = 1
        print('\033[91m [WARNING] ======> Building Manager has hardcoded value' )
        serializer = BuildingManagerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE'])   
def apiManager(request,pk):
    try:
        manager = BuildingManager.objects.get(pk=pk)
    except BuildingManager.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Detail of manager
    if request.method == 'GET':
        serializer = BuildingManagerSerializer(manager, many=False)
        return Response(serializer.data)
    # Update manager
    elif request.method == 'PUT':
        serializer = BuildingManagerSerializer(manager, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        manager.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
