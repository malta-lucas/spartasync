from rest_framework import viewsets, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Company, Plan, Role, User
from .serializers import (
    CompanySerializer, PlanSerializer, RoleSerializer, UserSerializer,
    RegisterCompanySerializer
)
from modules.models import Module

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class PlanViewSet(viewsets.ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

    # AQUI: Override do método list
    def list(self, request, *args, **kwargs):
        # Pega todos os papéis reais
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        roles = serializer.data

        # Cria um "papel" administrador fake (default), só pra resposta
        admin_role = {
            "id": 0,  # Pode ser qualquer valor não utilizado no banco (tipo 0, -1, 'admin' etc.)
            "name": "Administrador",
            "module_permissions": []
        }

        # Cria permissões level "edit" para TODOS os módulos cadastrados (ativos)
        modules = Module.objects.filter(is_deleted=False)
        for m in modules:
            admin_role["module_permissions"].append({
                "id": None,
                "module": {
                    "id": m.id,
                    "name": m.name,
                    "slug": m.slug,
                    "description": m.description,
                },
                "level": "edit"
            })

        # Junta o admin default antes de todos os outros papéis (ou depois, se quiser)
        response_data = [admin_role] + roles

        return Response(response_data)

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return User.objects.none()
        return User.objects.filter(company=user.company)

    def perform_create(self, serializer):
        serializer.save(company=self.request.user.company)

class RegisterCompanyView(APIView):
    def post(self, request):
        serializer = RegisterCompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Empresa e usuário criados!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
