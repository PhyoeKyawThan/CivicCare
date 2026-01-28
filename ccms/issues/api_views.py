from rest_framework import generics, status
from .serializers import IssueTypeSerializer
from .models import IssueType
from rest_framework.permissions import AllowAny

class IssueTypesAPI(generics.ListCreateAPIView):
    queryset = IssueType.objects.all()
    serializer_class = IssueTypeSerializer
    permission_classes = [AllowAny]
        