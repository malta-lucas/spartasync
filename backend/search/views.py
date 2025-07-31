from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q

from tags.models import Tag
from contacts.models import Contact

def get_paginated(queryset, page, page_size):
    total = queryset.count()
    start = (page - 1) * page_size
    end = start + page_size
    objects = queryset[start:end]
    return {
        "count": total,
        "page": page,
        "page_size": page_size,
        "results": objects
    }

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def global_search(request):
    term = request.GET.get('term', '')

    tags_page = int(request.GET.get('tags_page', 1))
    contacts_page = int(request.GET.get('contacts_page', 1))
    page_size = int(request.GET.get('page_size', 10))

    tags_qs = Tag.objects.filter(title__icontains=term)
    contacts_qs = Contact.objects.filter(
        Q(pushname__icontains=term) | Q(number__icontains=term)
    )

    tags_paginated = get_paginated(tags_qs, tags_page, page_size)
    contacts_paginated = get_paginated(contacts_qs, contacts_page, page_size)

    tags_data = [
        {"id": t.id, "title": t.title, "color": t.color}
        for t in tags_paginated['results']
    ]
    contacts_data = [
        {
            "id": c.id,
            "name": c.pushname,         # Use o campo real do nome
            "email": "",                # Se não houver email, deixe vazio ou pegue de outro campo
            "number": c.number,         # Adicione o número se quiser mostrar no frontend
        }
        for c in contacts_paginated['results']
    ]

    results = {
        "tags": {
            "count": tags_paginated['count'],
            "page": tags_page,
            "page_size": page_size,
            "results": tags_data
        },
        "contacts": {
            "count": contacts_paginated['count'],
            "page": contacts_page,
            "page_size": page_size,
            "results": contacts_data
        }
    }
    return Response(results)
