from rest_framework.decorators import api_view
from rest_framework.response import Response
from records.models import Task
from api.serializers import TaskSerializer
from rest_framework import status

@api_view(['GET','POST'])
def apiTasks(request):
    # Create task
    if request.method == 'GET':
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)