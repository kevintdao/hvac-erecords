from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from records.models import ProfilePlan, Profile
from api.serializers import ProfilePlanSerializer, ProfilePlanDisplaySerializer
from rest_framework import status
from rolepermissions.checkers import has_permission, has_role


@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def apiProfilePlans(request):
    # List profile plans
    if request.method == 'GET' and has_permission(request.user, 'get_plans'):
        profile_plans = ProfilePlan.objects.for_user(request.user)
        serializer = ProfilePlanDisplaySerializer(profile_plans, many=True)
        return Response(serializer.data)
    # Create profile plan
    elif request.method == 'POST' and has_permission(request.user, 'create_plans'):
        serializer = ProfilePlanSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response("This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def apiProfilePlan(request, pk):
    try:
        profile_plan = ProfilePlan.objects.for_user(request.user).get(pk=pk)
    except ProfilePlan.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Detail of profile plan
    if request.method == 'GET' and has_permission(request.user, 'view_plans'):
        serializer = ProfilePlanDisplaySerializer(profile_plan, many=False)
        return Response(serializer.data)
    # Update profile plan
    elif request.method == 'PUT' and has_permission(request.user, 'update_plans'):
        serializer = ProfilePlanSerializer(profile_plan, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # Delete profile plan
    elif request.method == 'DELETE' and has_permission(request.user, 'delete_plans'):
        profile_plan.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response("This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED)
