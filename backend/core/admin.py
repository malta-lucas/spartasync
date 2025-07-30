from django.contrib import admin
from .models import Company, Plan, Role, User
from modules.models import Module
from modules.admin import ModuleAdmin

from tags.models import Tag
from tags.admin import TagAdmin  # só se tiver classe custom
from contacts.models import Contact
from contacts.admin import ContactAdmin  # só se tiver classe custom

class MasterAdminSite(admin.AdminSite):
    site_header = "Administração Master"
    site_title = "Administração Master"
    index_title = "Painel Administrativo"

    def has_permission(self, request):
        return request.user.is_active and request.user.is_superuser

master_admin_site = MasterAdminSite(name='masteradmin')

master_admin_site.register(Company)
master_admin_site.register(Plan)
master_admin_site.register(Role)
master_admin_site.register(User)
master_admin_site.register(Module, ModuleAdmin)
master_admin_site.register(Tag, TagAdmin)         # Se existir TagAdmin, senão só Tag
master_admin_site.register(Contact, ContactAdmin) # Se existir ContactAdmin, senão só Contact
