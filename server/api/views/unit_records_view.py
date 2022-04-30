from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.models import Unit
from rest_framework import status
from api.serializers import UnitRecordsSerializer
from rolepermissions.checkers import has_permission
from .unit_view import filter_units

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def apiUnitRecords(request, pk):
    try:
        unit = filter_units(request.user).get(pk=pk)
    except Unit.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Unit records
    if request.method == 'GET' and has_permission(request.user, 'get_unit_records'):
        serializer = UnitRecordsSerializer(unit, many=False)
        return Response(serializer.data)
    return Response("This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED)