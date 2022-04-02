from rest_framework.decorators import api_view
from rest_framework.response import Response
from records.models import Profile
from api.serializers import ProfileCreateSerializer, ProfileDisplaySerializer
from rest_framework import status

@api_view(['GET','POST'])
def apiProfiles(request):
    # List profiles
    if request.method == 'GET':
        profiles = Profile.objects.all()
        serializer = ProfileDisplaySerializer(profiles, many=True)
        return Response(serializer.data)
    # Add profile
    elif request.method == 'POST':
        serializer = ProfileCreateSerializer(data=request.data)
        if serializer.is_valid():
            saved_obj = serializer.save()
            response_data = ProfileDisplaySerializer(saved_obj).data
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def apiProfile(request, pk):
    try:
        profile = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Detail of profile
    if request.method == 'GET':
        serializer = ProfileDisplaySerializer(profile, many=False)
        return Response(serializer.data)
    # Update profile
    elif request.method == 'PUT':
        serializer = ProfileCreateSerializer(profile, data=request.data)
        if serializer.is_valid():
            saved_obj = serializer.save()
            response_data = ProfileDisplaySerializer(saved_obj).data
            return Response(response_data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # Delete profile
    elif request.method == 'DELETE':
        profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
