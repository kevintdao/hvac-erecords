from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.models import Company
from api.serializers import CompanySerializer, CompanyUpdateSerializer
from rest_framework import status
from rolepermissions.checkers import has_permission

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def apiCompanies(request):
    # List companies
    if request.method == 'GET' and has_permission(request.user, 'get_companies'):
        companies = Company.objects.for_user(request.user)
        serializer = CompanySerializer(companies, many=True)
        return Response(serializer.data)
    # Create company
    elif request.method == 'POST' and has_permission(request.user, 'create_companies'):
        serializer = CompanySerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response("This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated]) 
def apiCompany(request,pk):
    try:
        company = Company.objects.for_user(request.user).get(pk=pk)
    except Company.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Detail of company
    if request.method == 'GET' and has_permission(request.user, 'view_companies'):
        serializer = CompanySerializer(company, many=False)
        return Response(serializer.data)
    # Update company
    elif request.method == 'PUT' and has_permission(request.user, 'update_companies'):
        serializer = CompanyUpdateSerializer(company, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # Delete company
    elif request.method == 'DELETE' and has_permission(request.user, 'delete_companies'):
        company.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response("This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED)