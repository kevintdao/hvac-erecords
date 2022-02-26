from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Technician
from api.serializers import TechnicianSerializer
from rest_framework import status

@api_view(['GET','POST'])
def apiTechnicians(request):
    # List technicians
    if request.method == 'GET':
        technicians = Technician.objects.all()
        serializer = TechnicianSerializer(technicians, many=True)
        return Response(serializer.data)
    # Create technician
    elif request.method == 'POST':
        serializer = TechnicianSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def apiTechnician(request,pk):
    try:
        technician = Technician.objects.get(pk=pk)
    except Technician.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Detail of technician
    if request.method == 'GET':
        serializer = TechnicianSerializer(technician, many=False)
        return Response(serializer.data)

