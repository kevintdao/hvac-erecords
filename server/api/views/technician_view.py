from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.models import Technician
from api.serializers import TechnicianSerializer
from rest_framework import status
# from django.contrib.auth.models import User
from base.models import User
from django.core.mail import send_mail
from django.conf import settings
from rolepermissions.roles import assign_role

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
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
            # username=request.data['email']
        )
        assign_role(user, 'technician')
        keys = ['first_name', 'last_name', 'phone_number', 'license_number',  'company']
        for key in keys:
            if key not in request.data:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer = TechnicianSerializer(data={'user': user.id, 'first_name': request.data['first_name'], 'last_name': request.data['last_name'], 'phone_number': request.data['phone_number'], 'license_number': request.data['license_number'], 'company': request.data['company'] })
        if serializer.is_valid():
            serializer.save()
            name = request.data['first_name']
            subject = 'Email to technician'
            message = f'Hello {name}. Set password'
            from_email = settings.EMAIL_HOST_USER
            to_email = request.data['email']

            send_mail(subject, message, from_email, [to_email], fail_silently=False)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
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
