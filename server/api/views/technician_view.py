from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Technician
from api.serializers import TechnicianSerializer
from rest_framework import status
from django.contrib.auth.models import User

@api_view(['GET','POST'])
def apiTechnicians(request):
    # List technicians
    if request.method == 'GET':
        technicians = Technician.objects.all()
        serializer = TechnicianSerializer(technicians, many=True)
        return Response(serializer.data)
    # Create technician
    elif request.method == 'POST':
        user = User.objects.create_user(
            email=request.data['email'],
            username=request.data['email']
        )
        keys = ['first_name', 'last_name', 'phone_number', 'license_number',  'company']
        for key in keys:
            if key not in request.data:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer = TechnicianSerializer(data={'user': user.id, 'first_name': request.data['first_name'], 'last_name': request.data['last_name'], 'phone_number': request.data['phone_number'], 'license_number': request.data['license_number'], 'company': request.data['company'] })
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE'])
def apiTechnician(request,pk):
    try:
        technician = Technician.objects.get(pk=pk)
    except Technician.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Detail of technician
    if request.method == 'GET':
        serializer = TechnicianSerializer(technician, many=False)
        return Response(serializer.data)
    # Update technician
    elif request.method == 'PUT':
        serializer = TechnicianSerializer(technician, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # Delete technician
    elif request.method == 'DELETE':
        technician.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
