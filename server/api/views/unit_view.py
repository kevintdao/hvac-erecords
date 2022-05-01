from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.models import Unit, BuildingManager, Building
from api.serializers import UnitSerializer
from rest_framework import status
from rolepermissions.checkers import has_permission, has_role

def filter_units(user):
    if has_role(user,['company', 'technician']):
        managers = BuildingManager.objects.filter(company=user.company)
        buildings = Building.objects.filter(manager__in=managers)
        return Unit.objects.filter(building__in=buildings)
    elif has_role(user,'manager'):
        manager = user.managers.first()
        buildings = Building.objects.filter(manager=manager)
        return Unit.objects.filter(building__in=buildings)
    elif has_role(user,'admin'):
        return Unit.objects.all()
    else:
        return Unit.objects.none()

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def apiUnits(request):
    # List units
    if request.method == 'GET' and has_permission(request.user, 'get_units'):
        units = filter_units(request.user)
        serializer = UnitSerializer(units, many=True)
        return Response(serializer.data)
    # Create unit
    elif request.method == 'POST' and has_permission(request.user, 'create_units'):
        serializer = UnitSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response("This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def apiUnit(request, pk):
    try:
        unit = filter_units(request.user).get(pk=pk)
    except Unit.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Detail of unit
    if request.method == 'GET' and has_permission(request.user, 'view_units'):
        serializer = UnitSerializer(unit, many=False)
        return Response(serializer.data)
    # Update unit
    elif request.method == 'PUT' and has_permission(request.user, 'update_units'):
        serializer = UnitSerializer(unit, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE' and has_permission(request.user, 'delete_units'):
        unit.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response("This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED)
