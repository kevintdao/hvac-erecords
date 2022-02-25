
from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import BuildingManager
from api.serializers import BuildingManagerSerializer

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

