from django.db import models
from core.models import Company  # Importa sua Company!

class Contact(models.Model):
    # id já é criado automaticamente como AutoField (chave primária)
    number = models.CharField(max_length=32)
    is_business = models.BooleanField(default=False)
    pushname = models.CharField(max_length=255, blank=True, null=True)
    contact_type = models.CharField(max_length=16, blank=True, null=True)
    is_me = models.BooleanField(default=False)
    is_user = models.BooleanField(default=False)
    is_group = models.BooleanField(default=False)
    is_wa_contact = models.BooleanField(default=False)
    is_my_contact = models.BooleanField(default=False)
    is_blocked = models.BooleanField(default=False)
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='contacts',
        null=True,  # pode deixar null no começo pra facilitar a migração dos registros antigos
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.pushname or self.number} ({self.id})"
