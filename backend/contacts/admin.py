from django.contrib import admin
from .models import Contact

class ContactAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'number', 'pushname', 'contact_type', 'is_business', 'is_user',
        'is_group', 'is_blocked', 'company', 'created_at', 'updated_at', 'is_deleted'
    ]
    search_fields = ['number', 'pushname']
    list_filter = ['is_business', 'is_user', 'is_group', 'is_wa_contact', 'is_my_contact', 'is_blocked', 'company', 'is_deleted']
    ordering = ['-created_at']
