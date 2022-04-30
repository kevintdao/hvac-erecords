from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from records.models import ServiceVisit
from api.serializers import ServiceVisitSerializer
from rest_framework import status
from rolepermissions.checkers import has_permission

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def apiVisits(request):
    # List service visits
    if request.method == 'GET' and has_permission(request.user, 'get_visits'):
        visits = ServiceVisit.objects.all()
        serializer = ServiceVisitSerializer(visits, many=True)
        return Response(serializer.data)
    # Create service visit
    elif request.method == 'POST' and has_permission(request.user, 'create_visits'):
        serializer = ServiceVisitSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response("This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def apiVisit(request, pk):
    try:
        visit = ServiceVisit.objects.get(pk=pk)
    except ServiceVisit.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Detail of visit
    if request.method == 'GET' and has_permission(request.user, 'view_visits'):
        serializer = ServiceVisitSerializer(visit, many=False)
        return Response(serializer.data)
    # Update visit
    elif request.method == 'PUT' and has_permission(request.user, 'update_visits'):
        serializer = ServiceVisitSerializer(visit, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # Delete visit
    elif request.method == 'DELETE' and has_permission(request.user, 'delete_visits'):
        visit.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response("This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED)