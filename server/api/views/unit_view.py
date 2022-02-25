from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Unit
from api.serializers import UnitSerializer
from rest_framework import status

@api_view(['GET','POST'])   
def apiUnits(request):
    # List units
    if request.method == 'GET':
        units = Unit.objects.all()
        serializer = UnitSerializer(units, many=True)
        return Response(serializer.data)
    # Create unit
    elif request.method == 'POST':
        serializer = UnitSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET','PUT','DELETE'])   
def apiUnit(request,pk):
    print()