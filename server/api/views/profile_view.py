from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from records.models import Profile
from api.serializers import ProfileCreateSerializer, ProfileDisplaySerializer
from rest_framework import status
from rolepermissions.checkers import has_permission


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def apiProfiles(request):
    # List profiles
    if request.method == "GET" and has_permission(request.user, "get_profiles"):
        profiles = Profile.objects.for_user(request.user)
        report_profiles = Profile.objects.for_reports()
        profiles = profiles | report_profiles
        serializer = ProfileDisplaySerializer(profiles, many=True)
        return Response(serializer.data)
    # Add profile
    elif request.method == "POST" and has_permission(request.user, "create_profiles"):
        serializer = ProfileCreateSerializer(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            saved_obj = serializer.save()
            response_data = ProfileDisplaySerializer(saved_obj).data
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(
        "This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED
    )


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def apiProfile(request, pk):
    try:
        profiles = Profile.objects.for_user(request.user)
        if request.method == "GET":
            report_profiles = Profile.objects.for_reports()
            profiles = profiles | report_profiles
        profile = profiles.get(pk=pk)
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Detail of profile
    if request.method == "GET" and has_permission(request.user, "view_profiles"):
        serializer = ProfileDisplaySerializer(profile, many=False)
        return Response(serializer.data)
    # Update profile
    elif request.method == "PUT" and has_permission(request.user, "update_profiles"):
        serializer = ProfileCreateSerializer(
            profile, data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            saved_obj = serializer.save()
            response_data = ProfileDisplaySerializer(saved_obj).data
            return Response(response_data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # Delete profile
    elif request.method == "DELETE" and has_permission(request.user, "delete_profiles"):
        profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(
        "This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED
    )
