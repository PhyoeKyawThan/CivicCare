from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import SignupSerializer, LoginSerializer, UserSerializer
from rest_framework.permissions import AllowAny

class SignupAPI(generics.CreateAPIView):
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)

        return Response({
            "user": {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email,
                "phone": user.phone,
            },
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })

        
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
