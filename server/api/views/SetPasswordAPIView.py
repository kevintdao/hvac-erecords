from rest_framework.generics import GenericAPIView
from rest_framework import status
from rest_framework.response import Response
from api.serializers import SetPasswordSerializer

class SetPasswordAPIView(GenericAPIView):
    serializer_class = SetPasswordSerializer

    def patch(self, request):
        serializer=self.serializer_class(data=request.data)

        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password set success'}, status=status.HTTP_200_OK)