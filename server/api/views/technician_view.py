from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.models import Technician, Company
from api.serializers import TechnicianSerializer
from rest_framework import status
# from django.contrib.auth.models import User
from base.models import User
from django.core.mail import send_mail
from django.conf import settings
from rolepermissions.roles import assign_role
from rolepermissions.checkers import has_permission, has_role

def filter_technicians(user):
    if has_role(user,'company'):
        return Technician.objects.filter(company=user.company)
    elif has_role(user,'admin'):
        return Technician.objects.all()
    else:
        return Technician.objects.none()


@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def apiTechnicians(request):
    # List technicians
    if request.method == 'GET' and has_permission(request.user, 'get_technicians'):
        technicians = filter_technicians(request.user)
        serializer = TechnicianSerializer(technicians, many=True)
        return Response(serializer.data)
    # Create technician
    elif request.method == 'POST' and has_permission(request.user, 'create_technicians'):
        if 'company' not in request.data.keys():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        company = Company.objects.get(pk=request.data['company'])
        if not company:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create(
            email=request.data['email'],
            company=company
        )
        user.save()
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
    return Response("This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def apiTechnician(request,pk):
    try:
        technician = filter_technicians(request.user).get(pk=pk)
    except Technician.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Detail of technician
    if request.method == 'GET' and has_permission(request.user, 'view_technicians'):
        serializer = TechnicianSerializer(technician, many=False)
        return Response(serializer.data)
    # Update technician
    elif request.method == 'PUT' and has_permission(request.user, 'update_technicians'):
        serializer = TechnicianSerializer(technician, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # Delete technician
    elif request.method == 'DELETE' and has_permission(request.user, 'delete_technicians'):
        technician.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response("This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED)
