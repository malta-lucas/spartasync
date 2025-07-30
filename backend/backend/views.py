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
        if not user_company:
            return Response({
                "telefone": 0,
                "contatos": 0,
                "grupos": 0,
                "mensagens": 0,
                "campanhas": 0,
                "tags": 0,
                "sessoes_ativas": 0,
                "sessoes_historico": 0,
                "agendamentos": 0,
                "envios_programados": 0,
                "fila_envio": 0,
                "historico": 0
            })

        return Response({
            "telefone": 0,
            "contatos": Contact.objects.filter(is_deleted=False, company=user_company).count(),
            "grupos": 0,
            "mensagens": 0,
            "campanhas": 0,
            "tags": Tag.objects.filter(is_deleted=False, user_company=user_company).count(),
            "sessoes_ativas": 0,
            "sessoes_historico": 0,
            "agendamentos": 0,
            "envios_programados": 0,
            "fila_envio": 0,
            "historico": 0
        })