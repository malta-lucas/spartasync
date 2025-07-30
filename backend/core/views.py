from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Company, Plan, Role, User
from .serializers import (
    CompanySerializer, PlanSerializer, RoleSerializer, UserSerializer,
    RegisterCompanySerializer
)

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class PlanViewSet(viewsets.ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class RegisterCompanyView(APIView):
    def post(self, request):
        serializer = RegisterCompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Empresa e usuário criados!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
