# NÃO registre o model aqui no admin padrão!
from django.contrib import admin
from .models import Module

class ModuleAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'is_deleted', 'created_at', 'updated_at']
    search_fields = ['name', 'slug']
    list_filter = ['is_deleted']
    ordering = ['name']

# NÃO faça:
# admin.site.register(Module, ModuleAdmin)
# @admin.register(Module)
