from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.models import Company
from api.serializers import CompanySerializer
from rest_framework import status

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def apiCompanies(request):
    # List companies
    if request.method == 'GET':
        companies = Company.objects.all()
        serializer = CompanySerializer(companies, many=True)
        return Response(serializer.data)
    # Create company
    elif request.method == 'POST':
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated]) 
def apiCompany(request,pk):
    try:
        building = Company.objects.get(pk=pk)
    except Company.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Detail of company
    if request.method == 'GET':
        serializer = CompanySerializer(building, many=False)
        return Response(serializer.data)
    # Update company
    elif request.method == 'PUT':
        serializer = CompanySerializer(building, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # Delete company
    elif request.method == 'DELETE':
        building.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)