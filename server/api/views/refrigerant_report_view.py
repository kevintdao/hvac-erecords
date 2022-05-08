from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rolepermissions.checkers import has_permission
from base.models import Unit
from api.serializers import RefrigerantReportSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def apiRefrigerantReport(request, pk):
    try:
        unit = Unit.objects.for_user(request.user).get(pk=pk)
    except Unit.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Unit records
    if request.method == "GET" and has_permission(
        request.user, "get_refrigerant_report"
    ):
        serializer = RefrigerantReportSerializer(unit, many=False)
        return Response(serializer.data)
    return Response(
        "This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED
    )
