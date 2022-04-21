from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.models import Unit
from rest_framework import status
from api.serializers import UnitRecordsSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def apiUnitRecords(request, pk):
    try:
        unit = Unit.objects.get(pk=pk)
    except Unit.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Detail of unit
    if request.method == 'GET':
        serializer = UnitRecordsSerializer(unit, many=False)
        return Response(serializer.data)