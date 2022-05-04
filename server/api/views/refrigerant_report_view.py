from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rolepermissions.checkers import has_permission

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def apiRefrigerantReport(request, pk):
    if request.method == 'GET' and has_permission(request.user, 'get_refrigerant_report'):
        return Response()
    return Response("This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED)