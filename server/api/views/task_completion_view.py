from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from records.models import TaskCompletion
from api.serializers import TaskCompletionSerializer
from rest_framework import status
from rolepermissions.checkers import has_permission

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def apiCompletions(request):
    # List task completions
    if request.method == 'GET' and has_permission(request.user, 'get_completions'):
        task_completions = TaskCompletion.objects.all()
        serializer = TaskCompletionSerializer(task_completions, many=True)
        return Response(serializer.data)
    # Create task completion
    elif request.method == 'POST' and has_permission(request.user, 'create_completions'):
        serializer = TaskCompletionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response("This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def apiCompletion(request, pk):
    try:
        task_completion = TaskCompletion.objects.get(pk=pk)
    except TaskCompletion.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Detail of task completion
    if request.method == 'GET' and has_permission(request.user, 'view_completions'):
        serializer = TaskCompletionSerializer(task_completion, many=False)
        return Response(serializer.data)
    # Update task completion
    elif request.method == 'PUT' and has_permission(request.user, 'update_completions'):
        serializer = TaskCompletionSerializer(task_completion, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # Delete task completion
    elif request.method == 'DELETE' and has_permission(request.user, 'delete_completions'):
        task_completion.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response("This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED)