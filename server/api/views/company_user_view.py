from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.models import CompanyUser
from api.serializers import CompanyUserSerializer
from rest_framework import status
from rolepermissions.checkers import has_permission, has_role

def filter_company_users(user):
    if has_role(user,'company'):
        return CompanyUser.objects.filter(company=user.company)
    elif has_role(user,'admin'):
        return CompanyUser.objects.all()
    else:
        return CompanyUser.objects.none()

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def apiCompanyUsers(request):
    # List company users
    if request.method == 'GET' and has_permission(request.user, 'get_company_users'):
        companyuser = filter_company_users(request.user)
        serializer = CompanyUserSerializer(companyuser, many=True)
        return Response(serializer.data)
    # Create company user
    elif request.method == 'POST' and has_permission(request.user, 'create_company_users'):
        serializer = CompanyUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response("This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def apiCompanyUser(request, pk):
    try:
        companyuser = filter_company_users(request.user).get(pk=pk)
    except CompanyUser.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Detail of company user
    if request.method == 'GET' and has_permission(request.user, 'view_company_users'):
        serializer = CompanyUserSerializer(companyuser, many=False)
        return Response(serializer.data)
    # Update company user
    elif request.method == 'PUT' and has_permission(request.user, 'update_company_users'):
        serializer = CompanyUserSerializer(companyuser, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # Delete company user
    elif request.method == 'DELETE' and has_permission(request.user, 'delete_company_users'):
        companyuser.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response("This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED)
