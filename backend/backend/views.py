# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from contacts.models import Contact
from tags.models import Tag

class SidebarStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_company = getattr(request.user, "company", None)
        filter_kwargs = {"company": user_company} if user_company else {}

        return Response({
            "contatos": Contact.objects.filter(is_deleted=False).count(),
            "grupos": 0,
            "mensagens": 0,
            "campanhas": 0,
            "tags": Tag.objects.filter(is_deleted=False).count(),
            "sessoes_ativas": 0,
            "sessoes_historico": 0,
            "agendamentos": 0,
            "envios_programados": 0,
            "fila_envio": 0
        })