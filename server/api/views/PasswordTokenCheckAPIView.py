from rest_framework.generics import GenericAPIView

class PasswordTokenCheckAPI(GenericAPIView):
    def get(self, request, uidb64, token):
        pass
    