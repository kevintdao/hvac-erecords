from rest_framework.decorators import api_view
from rest_framework.response import Response
from records.models import ProfilePlan
from api.serializers import ProfilePlanSerializer
from rest_framework import status

@api_view(['GET','POST'])
def apiProfilePlans(request):
    if request.method == 'GET':
        profile_plans = ProfilePlan.objects.all()
        serializer = ProfilePlanSerializer(profile_plans, many=True)
        return Response(serializer.data)
    # Create unit
    elif request.method == 'POST':
        serializer = ProfilePlanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)