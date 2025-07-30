# modules/views.py

from rest_framework import viewsets, permissions
from .models import Module
from .serializers import ModuleSerializer

class ModuleViewSet(viewsets.ModelViewSet):
    queryset = Module.objects.filter(is_deleted=False)
    serializer_class = ModuleSerializer

    # Só permite acesso a admins/superusers (ou ajuste como quiser)
    permission_classes = [permissions.IsAdminUser]
