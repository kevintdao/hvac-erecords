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