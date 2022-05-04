from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from records.models import Task
from api.serializers import TaskSerializer
from rest_framework import status
from rolepermissions.checkers import has_permission, has_role


@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def apiTasks(request):
    # Create task
    if request.method == 'GET' and has_permission(request.user, 'get_tasks'):
        tasks = Task.objects.for_user(request.user)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    elif request.method == 'POST' and has_permission(request.user, 'create_tasks'):
        serializer = TaskSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response("This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def apiTask(request, pk):
    try:
        tasks = Task.objects.for_user(request.user)
        if request.method == 'GET':
            report_tasks = Task.objects.for_reports()
            tasks = tasks | report_tasks
        task = tasks.get(pk=pk)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Detail of task
    if request.method == 'GET' and has_permission(request.user, 'view_tasks'):
        serializer = TaskSerializer(task, many=False)
        return Response(serializer.data)
    # Update task
    elif request.method == 'PUT' and has_permission(request.user, 'update_tasks'):
        serializer = TaskSerializer(task, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # Delete task
    elif request.method == 'DELETE' and has_permission(request.user, 'delete_tasks'):
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response("This user cannot perform this action.", status=status.HTTP_401_UNAUTHORIZED)
