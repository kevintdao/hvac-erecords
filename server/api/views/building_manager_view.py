from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import BuildingManager
from api.serializers import BuildingManagerSerializer
from rest_framework import status

'''
@api_view(['GET'])
def getData(request):
    managers = BuildingManager.objects.all()
    serializer = BuildingManagerSerializer(managers, many=True)
    return Response(serializer.data)

@api_view(['POST'])   
def addManager(request):
    serializer = BuildingManagerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['GET'])   
def getManager(request, pk):
    manager = BuildingManager.objects.get(pk=pk)
    serializer = BuildingManagerSerializer(manager, many=False)
    return Response(serializer.data)

@api_view(['POST'])   
def updateManager(request, pk):
    manager = BuildingManager.objects.get(pk=pk)
    serializer = BuildingManagerSerializer(instance=manager, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

'''

@api_view(['GET','POST'])   
def apiManagers(request):
    # List managers
    if request.method == 'GET':
        managers = BuildingManager.objects.all()
        serializer = BuildingManagerSerializer(managers, many=True)
        return Response(serializer.data)
    # Create manager
    elif request.method == 'POST':
        serializer = BuildingManagerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

@api_view(['GET','PUT','DELETE'])   
def apiManager(request,pk):
    # Detail of manager
    if request.method == 'GET':
        manager = BuildingManager.objects.get(pk=pk)
        serializer = BuildingManagerSerializer(manager, many=False)
        return Response(serializer.data)
    # Update manager
    elif request.method == 'PUT':
        manager = BuildingManager.objects.get(pk=pk)
        serializer = BuildingManagerSerializer(manager, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':
        manager = BuildingManager.objects.get(pk=pk)
        manager.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
