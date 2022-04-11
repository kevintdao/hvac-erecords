from rest_framework.decorators import api_view
from rest_framework.response import Response
from records.models import ServiceVisit
from api.serializers import ServiceVisitSerializer
from rest_framework import status

@api_view(['GET','POST'])
def apiVisits(request):
    # List service visits
    if request.method == 'GET':
        visits = ServiceVisit.objects.all()
        serializer = ServiceVisitSerializer(visits, many=True)
        return Response(serializer.data)
    # Create service visit
    elif request.method == 'POST':
        serializer = ServiceVisitSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def apiVisit(request, pk):
    try:
        visit = ServiceVisit.objects.get(pk=pk)
    except ServiceVisit.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Detail of visit
    if request.method == 'GET':
        serializer = ServiceVisitSerializer(visit, many=False)
        return Response(serializer.data)
    # Update visit
    elif request.method == 'PUT':
        serializer = ServiceVisitSerializer(visit, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # Delete visit
    elif request.method == 'DELETE':
        visit.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)