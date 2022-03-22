from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Company
from api.serializers import CompanySerializer
from rest_framework import status

@api_view('GET')
def apiCompanies(request):
    # List companies
    if request.method == 'GET':
        companies = Company.objects.all()
        serializer = CompanySerializer(companies, many=True)
        return Response(serializer.data)
