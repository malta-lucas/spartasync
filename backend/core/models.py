from django.db import models
from django.contrib.auth.models import AbstractUser

# Importe Module do app modules
# (Não esqueça de adicionar 'modules' ao INSTALLED_APPS)
from modules.models import Module

class Company(models.Model):
    name = models.CharField(max_length=255, unique=True)
    company_type = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name

class Plan(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)  # unique para evitar duplicados

    def __str__(self):
        return self.name

class User(AbstractUser):
    name = models.CharField("Nome do Usuário", max_length=150, blank=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True, unique=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='users', null=True, blank=True)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True, related_name='users')
    plan = models.ForeignKey(Plan, on_delete=models.SET_NULL, null=True, blank=True)

    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return f"{self.company}\\{self.email or self.username}"

# Permissão entre Role e Module
class RoleModulePermission(models.Model):
    PERMISSION_LEVELS = [
        ('none', 'Sem Permissão'),
        ('view', 'Visualizar'),
        ('edit', 'Editar'),
    ]
    role = models.ForeignKey(Role, on_delete=models.CASCADE, related_name='module_permissions')
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='role_permissions')
    level = models.CharField(max_length=10, choices=PERMISSION_LEVELS, default='none')

    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('role', 'module')

    def __str__(self):
        return f"{self.role.name} - {self.module.name}: {self.level}"
