from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.models import Unit
from api.serializers import UnitSerializer
from rest_framework import status

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def apiUnits(request):
    # List units
    if request.method == 'GET':
        units = Unit.objects.all()
        serializer = UnitSerializer(units, many=True)
        return Response(serializer.data)
    # Create unit
    elif request.method == 'POST':
        serializer = UnitSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def apiUnit(request, pk):
    try:
        unit = Unit.objects.get(pk=pk)
    except Unit.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Detail of unit
    if request.method == 'GET':
        serializer = UnitSerializer(unit, many=False)
        return Response(serializer.data)
    # Update unit
    elif request.method == 'PUT':
        serializer = UnitSerializer(unit, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        unit.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
