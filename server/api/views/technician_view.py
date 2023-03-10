from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.models import Technician
from api.serializers import (
    TechnicianSerializer,
    TechnicianUpdateSerializer,
    TechnicianDisplaySerializer,
)
from rest_framework import status
from rolepermissions.roles import assign_role
from rolepermissions.checkers import has_permission


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def apiTechnicians(request):
    # List technicians
    if request.method == "GET" and has_permission(request.user, "get_technicians"):
        technicians = Technician.objects.for_user(request.user)
        serializer = TechnicianSerializer(technicians, many=True)
        return Response(serializer.data)
    # Create technician
    elif request.method == "POST" and has_permission(
        request.user, "create_technicians"
    ):
        serializer = TechnicianSerializer(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            technician = serializer.save()
            assign_role(technician.user, "technician")
            technician.user.role = 3
            technician.user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(
        "This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED
    )


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def apiTechnician(request, pk):
    try:
        technician = Technician.objects.for_user(request.user).get(pk=pk)
    except Technician.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Detail of technician
    if request.method == "GET" and has_permission(request.user, "view_technicians"):
        serializer = TechnicianDisplaySerializer(technician, many=False)
        return Response(serializer.data)
    # Update technician
    elif request.method == "PUT" and has_permission(request.user, "update_technicians"):
        serializer = TechnicianUpdateSerializer(
            technician, data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # Delete technician
    elif request.method == "DELETE" and has_permission(
        request.user, "delete_technicians"
    ):
        technician.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(
        "This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED
    )
