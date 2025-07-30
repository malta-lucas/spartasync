from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Tag
from .serializers import TagSerializer
from contacts.serializers import ContactSerializer

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    def get_queryset(self):
        # Só retorna tags NÃO deletadas
        return Tag.objects.filter(is_deleted=False)

    @action(detail=True, methods=['get'])
    def contacts(self, request, pk=None):
        tag = self.get_object()
        contacts = tag.contacts.all()
        serializer = ContactSerializer(contacts, many=True)
        return Response({'contacts': serializer.data})

    def destroy(self, request, *args, **kwargs):
        # Faz soft delete
        instance = self.get_object()
        instance.is_deleted = True
        instance.save()
        return Response(status=204)
