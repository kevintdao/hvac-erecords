from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from records.models import ProfilePlan
from api.serializers import ProfilePlanSerializer
from rest_framework import status

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def apiProfilePlans(request):
    # List profile plans
    if request.method == 'GET':
        profile_plans = ProfilePlan.objects.all()
        serializer = ProfilePlanSerializer(profile_plans, many=True)
        return Response(serializer.data)
    # Create profile plan
    elif request.method == 'POST':
        serializer = ProfilePlanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def apiProfilePlan(request, pk):
    try:
        profile_plan = ProfilePlan.objects.get(pk=pk)
    except ProfilePlan.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Detail of profile plan
    if request.method == 'GET':
        serializer = ProfilePlanSerializer(profile_plan, many=False)
        return Response(serializer.data)
    # Update profile plan
    elif request.method == 'PUT':
        serializer = ProfilePlanSerializer(profile_plan, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # Delete profile plan
    elif request.method == 'DELETE':
        profile_plan.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
