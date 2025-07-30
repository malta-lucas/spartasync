from django.db import models
from core.models import Company

class Tag(models.Model):
    title = models.CharField("Título", max_length=80)
    content = models.TextField("Descrição/Conteúdo", blank=True, default='')
    color = models.CharField("Cor", max_length=10, default='#10B981')

    user_company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='tags',
        verbose_name="Empresa"
    )

    created_at = models.DateTimeField("Criado em", auto_now_add=True)
    last_use = models.DateTimeField("Último uso", null=True, blank=True)
    updated_at = models.DateTimeField("Atualização", auto_now=True)
    contacts = models.ManyToManyField(
        'contacts.Contact',
        related_name='tags',
        blank=True,
        verbose_name='Contatos'
    )
    # NOVO: Soft delete
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.title
